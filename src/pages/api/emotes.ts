import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '~/lib/getAccessToken.server';
import { getBroadcasterId } from '~/lib/getBroadcasterId.server';
import { getEmotes } from '~/lib/getEmotes';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET')
		return res.status(405).json({ message: 'endpoint allow only GET method' });

	const channel = req.query.channel as string;

	const accessToken = await getAccessToken();
	const broadcasterId = await getBroadcasterId(channel, accessToken);

	res.setHeader('Cache-Control', `public, max-age=${60 * 15}`);
	res.status(200).json(await getEmotes(broadcasterId));
};

export default handler;
