export type Emotes = {
	bttv: {
		template: string;
		emotes: BTTVEmote[];
	};
	ffz: FFZEmote[];
	stv: STVEmote[];
	stvNew: STVNewEmote[];
};

export type BTTVEmote = {
	code: string;
	id: string;
	imageType: string;
	userId: string;
};

export type FFZEmote = {
	id: number;
	name: string;
	height: number;
	width: number;
	public: boolean;
	hidden: boolean;
	modifier: boolean;
	offset: null;
	margins: null;
	css: null;
	owner: {
		_id: number;
		name: string;
		display_name: string;
	};
	urls: {
		[key: string]: string;
	};
	status: number;
	usage_count: number;
	created_at: string;
	last_updated: string;
};

export type STVEmote = {
	id: string;
	name: string;
	owner: {
		id: string;
		twitch_id: string;
		login: string;
		display_name: string;
		role: {
			id: string;
			name: string;
			position: number;
			color: number;
			allowed: number;
			denied: number;
			default: boolean;
		};
	};
	visibility: number;
	visibility_simple: unknown[];
	mime: string;
	status: number;
	tags: unknown[];
	width: number[];
	height: number[];
	urls: string[][];
};

export type STVNewEmote = {
	id: string;
	name: string;
	flags: number;
	timestamp: number;
	actor_id: string | null;
	data: {
		id: string;
		name: string;
		flags: number;
		lifecycle: number;
		state: ('PERSONAL' | 'LISTED')[];
		listed: boolean;
		animated: boolean;
		owner: {
			id: string;
			username: string;
			display_name: string;
			avatar_url: string;
			roles: string[];
		};
		host: {
			url: string;
			files: {
				name: string;
				static_name: string;
				width: number;
				height: number;
				frrame_count: number;
				size: number;
				format: 'AVIF' | 'WEBP';
			}[];
		};
	};
};

export type TwitchEmote = {
	id: string;
	format: string[];
	images: {
		url_1x: string;
		url_2x: string;
		url_4x: string;
	};
	name: string;
	scale: string[];
	theme_mode: string[];
};
