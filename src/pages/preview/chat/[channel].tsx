import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ChatWidget } from '~/components/ChatWidget';
import { fromBase64 } from '~/lib/base64';
import { getAccessToken } from '~/lib/getAccessToken.server';
import { getBadges } from '~/lib/getBadges.server';
import { getBroadcasterId } from '~/lib/getBroadcasterId.server';
import { getEmotes } from '~/lib/getEmotes';
import { initialState } from '~/stores/useChatGenerator';
import { TwitchBadge } from '~/types/badge';
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
	const [chatSettings, setChatSettings] = useState(initialState);
	const [, setChannel] = useState('');
	const [emotes, setEmotes] = useState<Emotes>();
	const router = useRouter();

	useEffect(() => {
		const { channel: queryChannel, settings } = router.query;

		setChannel(queryChannel as string);
		getEmotes(queryChannel as string, broadcasterId).then((v) => setEmotes(v));

		try {
			const rawJson = fromBase64(settings as string);
			const json = JSON.parse(rawJson);
			setChatSettings(json);
		} catch (e) {
			console.error(e);
		}
		// eslint-why use onMount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			messages={[]}
		/>
	);
};

export default ChatWidgetPage;
