export const getBroadcasterId = async (channel: string, accessToken: string) => {
	const clientId = process.env.TWITCH_CLIENT_ID ?? '';

	const { data } = await fetch('https://api.twitch.tv/helix/users?login=' + channel, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Client-Id': clientId,
		},
	}).then((r) => r.json());

	return data[0].id;
};
