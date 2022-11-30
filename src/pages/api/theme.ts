import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { isValidTheme } from '~/lib/isValidTheme';
import { BruhitchTheme } from '~/types/theme';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(405).json({ message: 'endpoint allow only POST method' });
	if (!req.headers['content-type']?.includes('application/json'))
		return res.status(415).json({ message: 'endpoint allow only application/json content type' });
	let theme: BruhitchTheme;
	try {
		if (!isValidTheme(req.body.theme))
			return res.status(400).json({ message: 'valid themes is ["system", "dark", "light"]' });
		theme = req.body.theme;
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: 'failed to deserialize content' });
	}

	setCookie('bruhitch-theme', theme, {
		req,
		res,
		maxAge: 60 * 60 * 24 * 30 * 12 * 25,
	});

	res.status(200).json({ message: 'theme installed successfully' });
};

export default handler;
