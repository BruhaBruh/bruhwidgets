import create from 'zustand';
import { AnimationName, AnimationOptions, AnimationTimingFunction } from '~/types/animation';
import { ChatCustomNicknameColor, ChatSettings, ChatType } from '~/types/chatSettings';

export const initialState: ChatSettings = {
	type: 'default',
	isHideRewards: false,
	hiddenNicknames: [],
	color: '#8cf2a5',
	isGradientOnlyForCustomNicknames: false,
	customNicknames: {},
	font: '',
	fontSize: 16,
	isDisabledPadding: false,
	hideMessagesStartsWith: '!',
	animation: {
		name: 'slide',
		timingFunction: 'linear',
		options: {
			duration: 300,
		},
	},
	isHideLinks: true,
	bannedWords: [],
	maxMessagesToShow: 50,
	banWordReplacement: '***',
	linkReplacement: '<link>',
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
	setAnimationName: (name: AnimationName) => void;
	setAnimationTimingFunction: (timingFunction: AnimationTimingFunction) => void;
	setAnimationOptions: (options: AnimationOptions) => void;
	setAnimationOptionsFn: (options: (options: AnimationOptions) => AnimationOptions) => void;
	setHideMessagesStartsWith: (hideMessagesStartsWith: string) => void;
	setIsHideLinks: (isHideLinks: boolean) => void;
	addBanWord: (banWord: string) => void;
	removeBanWord: (banWord: string) => void;
	setMaxMessagesToShow: (maxMessagesToShow: number) => void;
	setBanWordReplacement: (banWordReplacement: string) => void;
	setLinkReplacement: (link: string) => void;
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
	setAnimationName(name: AnimationName) {
		set((p) => ({ ...p, animation: { ...p.animation, name } }));
	},
	setAnimationTimingFunction(timingFunction: AnimationTimingFunction) {
		set((p) => ({ ...p, animation: { ...p.animation, timingFunction } }));
	},
	setAnimationOptions(options: AnimationOptions) {
		set((p) => ({ ...p, animation: { ...p.animation, options } }));
	},
	setAnimationOptionsFn(options: (options: AnimationOptions) => AnimationOptions) {
		set((p) => ({ ...p, animation: { ...p.animation, options: options(p.animation.options) } }));
	},
	setHideMessagesStartsWith: (hideMessagesStartsWith: string) =>
		set((p) => ({ ...p, hideMessagesStartsWith })),
	setIsHideLinks: (isHideLinks) => set((p) => ({ ...p, isHideLinks })),
	addBanWord: (banWord) =>
		set((p) => ({
			...p,
			bannedWords: Array.from(new Set([...p.bannedWords, banWord.toLowerCase()])),
		})),
	removeBanWord: (banWord) =>
		set((p) => ({ ...p, bannedWords: p.bannedWords.filter((v) => v !== banWord.toLowerCase()) })),
	setMaxMessagesToShow: (maxMessagesToShow) => set((p) => ({ ...p, maxMessagesToShow })),
	setBanWordReplacement: (banWordReplacement) => set((p) => ({ ...p, banWordReplacement })),
	setLinkReplacement: (linkReplacement) => set((p) => ({ ...p, linkReplacement })),
	reset() {
		set((p) => ({ ...p, ...initialState }));
	},
}));
