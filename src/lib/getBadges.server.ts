import { TwitchBadge } from '~/types/badge';

const getGlobalBadges = async (clientId: string, accessToken: string) => {
	const { data } = await fetch('https://api.twitch.tv/helix/chat/badges/global', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Client-Id': clientId,
		},
	}).then((r) => r.json());

	return data as TwitchBadge[];
};

const getChannelBadges = async (broadcasterId: string, clientId: string, accessToken: string) => {
	const { data } = await fetch(
		'https://api.twitch.tv/helix/chat/badges?broadcaster_id=' + broadcasterId,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Client-Id': clientId,
			},
		}
	).then((r) => r.json());

	return data as TwitchBadge[];
};

export const getBadges = async (broadcasterId: string, accessToken: string) => {
	const clientId = process.env.TWITCH_CLIENT_ID ?? '';

	const globalBadges = await getGlobalBadges(clientId, accessToken);
	const channelBadges = await getChannelBadges(broadcasterId, clientId, accessToken);

	let mergedBadges = globalBadges;

	channelBadges.forEach((badge) => {
		mergedBadges = mergedBadges.map((b) => {
			if (b.set_id === badge.set_id) return badge;
			return b;
		});
	});

	return mergedBadges;
};
