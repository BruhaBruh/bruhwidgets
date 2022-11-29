import create from 'zustand';
import {
	ChatAnimationName,
	ChatAnimationTimingFunction,
	ChatCustomNicknameColor,
	ChatSettings,
	ChatType,
} from '~/types/chatSettings';

const initialState: ChatSettings = {
	type: 'default',
	isHideRewards: false,
	hiddenNicknames: [],
	color: '#8cf2a5',
	isGradientOnlyForCustomNicknames: false,
	customNicknames: {},
	font: '',
	fontSize: 16,
	isDisabledPadding: false,
	animation: {
		name: 'slide',
		timingFunction: 'linear',
		options: {
			duration: 150,
		},
	},
};

type ChatGeneratorFunctions = {
	set: (settings: ChatSettings) => void;
	setType: (type: ChatType) => void;
	setIsHideRewards: (isHideRewards: boolean) => void;
	addHiddenNickname: (nickname: string) => void;
	removeHiddenNickname: (nickname: string) => void;
	claerHiddenNicknames: () => void;
	setColor: (color: string) => void;
	setIsGradientOnlyForCustomNicknames: (isGradientOnlyForCustomNicknames: boolean) => void;
	addCustomNickname: (nickname: string, customNickname: ChatCustomNicknameColor) => void;
	removeCustomNickname: (nickname: string) => void;
	setFont: (font: string) => void;
	setFontSize: (fontSize: number) => void;
	setIsDisabledPadding: (isDisabledPadding: boolean) => void;
	setAnimationName: (name: ChatAnimationName) => void;
	setAnimationTimingFunction: (timingFunction: ChatAnimationTimingFunction | undefined) => void;
	setAnimationOptions: (options: Record<string, string | number> | undefined) => void;
	setAnimationOptionsFn: (
		options: (
			options: Record<string, string | number> | undefined
		) => Record<string, string | number> | undefined
	) => void;
	reset: () => void;
};

export const useChatGenerator = create<ChatSettings & ChatGeneratorFunctions>((set) => ({
	...initialState,
	set(settings) {
		set((p) => ({ ...p, ...settings }));
	},
	setType(type: ChatType) {
		set((p) => ({ ...p, type }));
	},
	setIsHideRewards(isHideRewards: boolean) {
		set((p) => ({ ...p, isHideRewards }));
	},
	addHiddenNickname(nickname: string) {
		set((p) => ({ ...p, hiddenNicknames: [...p.hiddenNicknames, nickname] }));
	},
	removeHiddenNickname(nickname: string) {
		set((p) => ({ ...p, hiddenNicknames: p.hiddenNicknames.filter((n) => n !== nickname) }));
	},
	claerHiddenNicknames() {
		set((p) => ({ ...p, hiddenNicknames: [] }));
	},
	setColor(color: string) {
		set((p) => ({ ...p, color }));
	},
	setIsGradientOnlyForCustomNicknames(isGradientOnlyForCustomNicknames: boolean) {
		set((p) => ({ ...p, isGradientOnlyForCustomNicknames }));
	},
	addCustomNickname(nickname: string, customNickname: ChatCustomNicknameColor) {
		set((p) => ({ ...p, customNicknames: { ...p.customNicknames, [nickname]: customNickname } }));
	},
	removeCustomNickname(nickname: string) {
		set((p) => {
			const customNicknames = p.customNicknames;
			delete customNicknames[nickname];
			return { ...p, customNicknames: customNicknames };
		});
	},
	setFont(font: string) {
		set((p) => ({ ...p, font }));
	},
	setFontSize(fontSize: number) {
		set((p) => ({ ...p, fontSize }));
	},
	setIsDisabledPadding(isDisabledPadding: boolean) {
		set((p) => ({ ...p, isDisabledPadding }));
	},
	setAnimationName(name: ChatAnimationName) {
		set((p) => ({ ...p, animation: { ...p.animation, name } }));
	},
	setAnimationTimingFunction(timingFunction: ChatAnimationTimingFunction | undefined) {
		set((p) => ({ ...p, animation: { ...p.animation, timingFunction } }));
	},
	setAnimationOptions(options: Record<string, string | number> | undefined) {
		set((p) => ({ ...p, animation: { ...p.animation, options } }));
	},
	setAnimationOptionsFn(
		options: (
			options: Record<string, string | number> | undefined
		) => Record<string, string | number> | undefined
	) {
		set((p) => ({ ...p, animation: { ...p.animation, options: options(p.animation.options) } }));
	},
	reset() {
		set((p) => ({ ...p, ...initialState }));
	},
}));
