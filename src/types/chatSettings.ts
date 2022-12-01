export type ChatType = 'default' | 'blocks' | 'alternative-blocks';

export type ChatCustomNicknameColor = {
	startColor: string;
	endColor?: string;
};

export type ChatAnimationName = 'slide' | 'scale' | 'fade' | 'none';

export type ChatAnimationTimingFunction = 'linear';

export type ChatAnimation = {
	name: ChatAnimationName;
	timingFunction?: ChatAnimationTimingFunction;
	options?: Record<string, number | string>;
};

export type ChatSettings = {
	type: ChatType;
	isHideRewards: boolean;
	hiddenNicknames: string[];
	color: string;
	isGradientOnlyForCustomNicknames: boolean;
	customNicknames: Record<string, ChatCustomNicknameColor>;
	font: string;
	fontSize: number;
	isDisabledPadding: boolean;
	animation: ChatAnimation;
	hideMessagesStartsWith: string;
};
