import { BTTVEmote, Emotes, FFZEmote, STVEmote } from '~/types/emote';

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

export const getEmotes = async (channel: string, broadcasterId: string): Promise<Emotes> => {
	console.log(broadcasterId);
	const stvGlobalEmotes: Promise<STVEmote[]> = fetch('https://api.7tv.app/v2/emotes/global', {
		method: 'GET',
	})
		.then((res) => {
			if (res.status !== 200) return [];
			return res.json();
		})
		.catch(console.error);
	const stvChannelEmotes: Promise<STVEmote[]> = fetch(
		'https://api.7tv.app/v2/users/' + channel + '/emotes',
		{
			method: 'GET',
		}
	)
		.then((res) => {
			if (res.status !== 200) return [];
			return res.json();
		})
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

	const [stvGlobal, bttvGlobal, ffzGlobal] = await Promise.all([
		stvGlobalEmotes,
		bttvGlobalEmotes,
		ffzGlobalEmotes,
	]);

	const [stvChannel, bttvChannel, ffzChannel] = await Promise.all([
		stvChannelEmotes,
		bttvChannelEmotes,
		ffzChannelEmotes,
	]);

	return {
		bttv: {
			template: 'https://cdn.betterttv.net/emote/{id}/3x',
			emotes: [...bttvGlobal, ...bttvChannel.sharedEmotes, ...bttvChannel.channelEmotes],
		},
		ffz: [...getFFZEmotes(ffzGlobal), ...getFFZEmotes(ffzChannel)],
		stv: [...stvGlobal, ...stvChannel],
	};
};
