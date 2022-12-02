export const getAccessToken = async () => {
	const clientId = process.env.TWITCH_CLIENT_ID ?? '';
	const secretKey = process.env.TWITCH_SECRET_KEY ?? '';

	const { access_token: accessToken } = await fetch('https://id.twitch.tv/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `client_id=${clientId}&client_secret=${secretKey}&grant_type=client_credentials`,
	}).then((r) => r.json());

	return accessToken as string;
};
