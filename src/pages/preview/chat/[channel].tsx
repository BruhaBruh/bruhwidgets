import { faker } from '@faker-js/faker';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { createRef, useCallback, useEffect, useState } from 'react';
import tmi, { Badges, ChatUserstate } from 'tmi.js';
import { ChatWidget } from '~/components/ChatWidget';
import { fromBase64 } from '~/lib/base64';
import { getAccessToken } from '~/lib/getAccessToken.server';
import { getBadges } from '~/lib/getBadges.server';
import { getBanWordRegExp } from '~/lib/getBanWordRegExp';
import { getBroadcasterId } from '~/lib/getBroadcasterId.server';
import { getEmotes } from '~/lib/getEmotes';
import { getLinkRegExp } from '~/lib/getLinkRegExp';
import { replaceBetween } from '~/lib/replaceBetween';
import { initialState } from '~/stores/useChatGenerator';
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

const generateSomeBadges = (badges: TwitchBadge[]): Badges => {
	const result: Badges = {};
	const amountOfBadges = faker.datatype.number({ min: 0, max: 3 });
	for (let i = 0; i < amountOfBadges; i++) {
		const badge = badges.at(faker.datatype.number({ min: 0, max: badges.length - 1 }));
		if (!badge) continue;
		const version = badge.versions.at(
			faker.datatype.number({ min: 0, max: badge.versions.length - 1 })
		);
		if (!version) continue;
		result[badge.set_id] = version.id;
	}
	return result;
};

const generateState = (badges: TwitchBadge[]): ChatUserstate => {
	const userName = faker.name.firstName();
	return {
		id: faker.datatype.uuid(),
		'tmi-sent-ts': '' + new Date().getTime(),
		color: faker.datatype.boolean() ? faker.color.rgb() : undefined,
		username: userName,
		'display-name': userName,
		'custom-reward-id': faker.datatype.boolean() ? faker.datatype.uuid() : undefined,
		badges: generateSomeBadges(badges),
	};
};

const generateMessage = (emotes: Emotes): string => {
	const message: string[] = [];
	const target = faker.datatype.number({ min: 1, max: 15 });

	for (let i = 0; i < target; i++) {
		if (faker.datatype.boolean()) {
			message.push(faker.lorem.word());
		} else {
			const random = faker.datatype.number({ min: 1, max: 3 });
			if (random === 0) {
				if (emotes.bttv.emotes.length === 0) continue;
				const emote = emotes.bttv.emotes.at(
					faker.datatype.number({ min: 0, max: emotes.bttv.emotes.length - 1 })
				);
				if (!emote) continue;
				message.push(emote.code);
			} else if (random === 1) {
				if (emotes.ffz.length === 0) continue;
				const emote = emotes.ffz.at(faker.datatype.number({ min: 0, max: emotes.ffz.length - 1 }));
				if (!emote) continue;
				message.push(emote.name);
			} else {
				if (emotes.stv.length === 0) continue;
				const emote = emotes.stv.at(faker.datatype.number({ min: 0, max: emotes.ffz.length - 1 }));
				if (!emote) continue;
				message.push(emote.name);
			}
		}
	}

	return message.join(' ');
};

const generateMessageWithState = (
	badges: TwitchBadge[],
	emotes: Emotes
): {
	userState: ChatUserstate;
	message: string;
} => {
	return {
		userState: generateState(badges),
		message: generateMessage(emotes),
	};
};

const ChatWidgetPage: NextPage<PageProps> = ({ broadcasterId, badges }: PageProps) => {
	const [chatSettings, setChatSettings] = useState(initialState);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [emotes, setEmotes] = useState<Emotes>({
		bttv: {
			template: 'https://cdn.betterttv.net/emote/{id}/3x',
			emotes: [],
		},
		ffz: [],
		stv: [],
	});
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

	useEffect(() => {
		const { channel: queryChannel, settings } = router.query;
		try {
			const rawJson = fromBase64(decodeURIComponent(settings as string));
			const json = JSON.parse(rawJson);
			setChatSettings({ ...initialState, ...json });
		} catch (e) {
			console.error(e);
		}

		getEmotes(queryChannel as string, broadcasterId).then((v) => setEmotes(v));
		// eslint-why use onMount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let timer: NodeJS.Timeout | undefined;
		const func = () => {
			const msg = generateMessageWithState(badges, emotes);
			handleNewMessage(msg.userState, msg.message);
			timer = setTimeout(func, faker.datatype.number({ min: 1000, max: 3000 }));
		};
		func();

		return () => {
			clearInterval(timer);
		};
	}, [handleNewMessage, badges, emotes]);

	return (
		<ChatWidget chatSettings={chatSettings} emotes={emotes} badges={badges} messages={messages} />
	);
};

export default ChatWidgetPage;
