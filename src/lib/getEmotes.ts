import { BTTVEmote, Emotes, FFZEmote, STVEmote, STVNewEmote } from '~/types/emote';

type FFZResponse = {
	sets: Record<
		string,
		{
			emoticons: FFZEmote[];
		}
	>;
};

const getFFZEmotes = (res: FFZResponse): FFZEmote[] => {
	const emotes: FFZEmote[] = [];
	if (!res?.sets) return [];
	Object.entries(res.sets).forEach(([, value]) => emotes.push(...value.emoticons));
	return emotes;
};

export const getEmotes = async (broadcasterId: string): Promise<Emotes> => {
	const stvGlobalEmotes: Promise<STVEmote[]> = fetch('https://api.7tv.app/v2/emotes/global', {
		method: 'GET',
	})
		.then((res) => {
			if (res.status !== 200) return [];
			return res.json();
		})
		.catch(console.error);
	const stvChannelEmotes: Promise<STVNewEmote[]> = fetch(
		'https://7tv.io/v3/users/twitch/' + broadcasterId,
		{
			method: 'GET',
		}
	)
		.then((res) => {
			if (res.status !== 200) return { emote_set: { emotes: [] } };
			return res.json();
		})
		.then((v) => v.emote_set.emotes)
		.catch(console.error);

	const bttvGlobalEmotes: Promise<BTTVEmote[]> = fetch(
		'https://api.betterttv.net/3/cached/emotes/global',
		{
			method: 'GET',
		}
	)
		.then((res) => {
			if (res.status !== 200) return [];
			return res.json();
		})
		.catch(console.error);
	const bttvChannelEmotes: Promise<{
		id: string;
		bots: unknown[];
		avatar: string;
		channelEmotes: BTTVEmote[];
		sharedEmotes: BTTVEmote[];
	}> = fetch('https://api.betterttv.net/3/cached/users/twitch/' + broadcasterId, {
		method: 'GET',
	})
		.then((res) => {
			if (res.status !== 200)
				return {
					id: '',
					bots: [],
					avatar: '',
					channelEmotes: [],
					sharedEmotes: [],
				};
			return res.json();
		})
		.catch(console.error);

	const ffzGlobalEmotes: Promise<FFZResponse> = fetch(
		'https://api.frankerfacez.com/v1/set/global',
		{
			method: 'GET',
		}
	)
		.then((res) => {
			if (res.status !== 200)
				return {
					sets: {},
				};
			return res.json();
		})
		.catch(console.error);

	const ffzChannelEmotes: Promise<FFZResponse> = fetch(
		'https://api.frankerfacez.com/v1/room/id/' + broadcasterId,
		{
			method: 'GET',
		}
	)
		.then((res) => {
			if (res.status !== 200)
				return {
					sets: {},
				};
			return res.json();
		})
		.catch(console.error);

	const bttvEmotes: BTTVEmote[] = [];
	const ffzEmotes: FFZEmote[] = [];
	const stvEmotes: STVEmote[] = [];
	const stvNewEmotes: STVNewEmote[] = [];

	try {
		const stvGlobal = await stvGlobalEmotes;
		stvEmotes.push(...stvGlobal);
	} catch (e) {
		console.error(e);
	}
	try {
		const stvChannel = await stvChannelEmotes;
		stvNewEmotes.push(...stvChannel);
	} catch (e) {
		console.error(e);
	}

	try {
		const ffzGlobal = await ffzGlobalEmotes;
		ffzEmotes.push(...getFFZEmotes(ffzGlobal));
	} catch (e) {
		console.error(e);
	}
	try {
		const ffzChannel = await ffzChannelEmotes;
		ffzEmotes.push(...getFFZEmotes(ffzChannel));
	} catch (e) {
		console.error(e);
	}

	try {
		const ffzGlobal = await ffzGlobalEmotes;
		ffzEmotes.push(...getFFZEmotes(ffzGlobal));
	} catch (e) {
		console.error(e);
	}
	try {
		const ffzChannel = await ffzChannelEmotes;
		ffzEmotes.push(...getFFZEmotes(ffzChannel));
	} catch (e) {
		console.error(e);
	}

	try {
		const bttvGlobal = await bttvGlobalEmotes;
		bttvEmotes.push(...bttvGlobal);
	} catch (e) {
		console.error(e);
	}
	try {
		const bttvChannel = await bttvChannelEmotes;
		bttvEmotes.push(...bttvChannel.sharedEmotes);
		bttvEmotes.push(...bttvChannel.channelEmotes);
	} catch (e) {
		console.error(e);
	}

	return {
		bttv: {
			template: 'https://cdn.betterttv.net/emote/{id}/3x',
			emotes: bttvEmotes,
		},
		ffz: ffzEmotes,
		stv: stvEmotes,
		stvNew: stvNewEmotes,
	};
};
