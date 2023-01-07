import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { createRef, useCallback, useEffect, useState } from 'react';
import tmi from 'tmi.js';
import { ChatWidget } from '~/components/ChatWidget';
import { getAccessToken } from '~/lib/getAccessToken.server';
import { getBadges } from '~/lib/getBadges.server';
import { getBanWordRegExp } from '~/lib/getBanWordRegExp';
import { getBroadcasterId } from '~/lib/getBroadcasterId.server';
import { getEmotes } from '~/lib/getEmotes';
import { getLinkRegExp } from '~/lib/getLinkRegExp';
import { replaceBetween } from '~/lib/replaceBetween';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { TwitchBadge } from '~/types/badge';
import { ChatMessage } from '~/types/chatMessage';
import { Emotes } from '~/types/emote';

type PageProps = {
	broadcasterId: string;
	badges: TwitchBadge[];
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
	const channel = ctx.query.channel as string;

	if (!channel) return { notFound: true };

	const accessToken = await getAccessToken();
	const broadcasterId = await getBroadcasterId(channel, accessToken);
	const badges = await getBadges(broadcasterId, accessToken);

	return {
		props: {
			broadcasterId,
			badges,
		},
	};
};

const ChatWidgetPage: NextPage<PageProps> = ({ broadcasterId, badges }: PageProps) => {
	const chatSettings = useChatGenerator();
	const [client, setClient] = useState<tmi.Client>();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [emotes, setEmotes] = useState<Emotes>();
	const router = useRouter();

	const handleNewMessage = useCallback(
		(state: tmi.ChatUserstate, message: string) => {
			if (chatSettings.isHideRewards && state['custom-reward-id']) return;
			if (message.toLowerCase().startsWith(chatSettings.hideMessagesStartsWith.toLowerCase()))
				return;
			if (
				chatSettings.hiddenNicknames.find((v) => v.toLowerCase() === state.username?.toLowerCase())
			)
				return;
			if (!state.id) return;

			const emoteTags: { id: string; start: number; end: number }[] = [];

			if (state.emotes) {
				Object.entries(state.emotes).forEach(([key, value]) => {
					value.forEach((pos) => {
						const [startString, endString] = pos.split('-');
						const start = +startString;
						const end = +endString;
						emoteTags.push({ id: key, start, end });
					});
				});
			}

			let formattedMessage = message;
			emoteTags
				.sort((a, b) => b.start - a.start)
				.forEach((emote) => {
					formattedMessage = replaceBetween(
						formattedMessage,
						emote.start,
						emote.end + 1,
						`<!${emote.id}!>`
					);
				});

			if (chatSettings.isHideLinks) {
				formattedMessage = formattedMessage.replaceAll(
					getLinkRegExp(),
					chatSettings.linkReplacement
				);
			}

			if (chatSettings.bannedWords.length > 0) {
				formattedMessage = formattedMessage.replaceAll(
					getBanWordRegExp(chatSettings.bannedWords),
					chatSettings.banWordReplacement
				);
			}

			setMessages((p) => {
				p.push({
					state,
					text: formattedMessage,
					nodeRef: createRef(),
				});
				return p
					.sort((a, b) => +(b.state['tmi-sent-ts'] ?? 0) - +(a.state['tmi-sent-ts'] ?? 0))
					.slice(0, chatSettings.maxMessagesToShow)
					.reverse();
			});
		},
		[chatSettings]
	);

	const removeMessage = useCallback(
		(messageId: string) => setMessages((m) => m.filter((v) => v.state.id !== messageId)),
		[setMessages]
	);

	const removeMessagesByNickname = useCallback(
		(nickname: string) =>
			setMessages((m) =>
				m.filter((v) => v.state.username?.toLowerCase() !== nickname.toLowerCase())
			),
		[setMessages]
	);

	useEffect(() => {
		const { channel: queryChannel, settings } = router.query;
		try {
			const raw = decodeURIComponent(settings as string);
			chatSettings.loadFromBase64(raw);
		} catch (e) {
			console.error(e);
		}

		getEmotes(queryChannel as string, broadcasterId).then((v) => setEmotes(v));

		setClient(
			new tmi.Client({
				connection: {
					reconnect: true,
					secure: true,
				},
				channels: [queryChannel as string],
			})
		);

		// eslint-why use onMount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!client) return;

		client.on('connecting', () => console.log('Twitch: connecting...'));
		client.on('connected', () => console.log('Twitch: connected!'));
		client.on('disconnected', (reason) => console.warn('Twitch: disconnected!', reason));
		client.on('reconnect', () => console.log('Twitch: reconnect!'));
		client.on('message', (_, userState, message) => handleNewMessage(userState, message));
		client.on('messagedeleted', (_, _channel, _deletedMessage, state) =>
			removeMessage(state['target-msg-id'] ?? '')
		);
		client.on('clearchat', () => setMessages([]));
		client.on('ban', (_channel, username) => removeMessagesByNickname(username));
		client.on('timeout', (_channel, username) => removeMessagesByNickname(username));

		client.connect().catch(console.error);

		return () => {
			if (['CLOSING', 'CLOSED'].includes(client.readyState())) return;
			client.disconnect();
		};
	}, [client, handleNewMessage, removeMessage, removeMessagesByNickname, setMessages]);

	return (
		<ChatWidget
			chatSettings={chatSettings}
			emotes={
				emotes ?? {
					bttv: {
						template: 'https://cdn.betterttv.net/emote/{id}/3x',
						emotes: [],
					},
					ffz: [],
					stv: [],
				}
			}
			badges={badges}
			messages={messages}
		/>
	);
};

export default ChatWidgetPage;
