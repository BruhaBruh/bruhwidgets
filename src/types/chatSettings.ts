import { AnimationName, AnimationOptions, AnimationTimingFunction } from '~/types/animation';

export type ChatType = 'default' | 'blocks' | 'alternative-blocks';

export type ChatCustomNicknameColor = {
	startColor: string;
	endColor?: string;
};

export type ChatAnimation = {
	name: AnimationName;
	timingFunction: AnimationTimingFunction;
	options: AnimationOptions;
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
	isHideLinks: boolean;
	bannedWords: string[];
	maxMessagesToShow: number;
	banWordReplacement: string;
	linkReplacement: string;
};
