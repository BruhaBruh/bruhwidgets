import { AnimationControl } from '~/components/ChatLinkGenerator/AnimationControl';
import { BanWordReplacementInput } from '~/components/ChatLinkGenerator/BanWordReplacement';
import { BanWordsInput } from '~/components/ChatLinkGenerator/BanWordsInput';
import { ColorControl } from '~/components/ChatLinkGenerator/ColorControl';
import { CustomNicknamesControl } from '~/components/ChatLinkGenerator/CustomNicknamesControl';
import { DisablePaddingSwitch } from '~/components/ChatLinkGenerator/DisablePaddingSwitch';
import { FontInput } from '~/components/ChatLinkGenerator/FontInput';
import { FontSizeInput } from '~/components/ChatLinkGenerator/FontSizeInput';
import { GradientOnlyForCustomNicknamesSwitch } from '~/components/ChatLinkGenerator/GradientOnlyForCustomNicknamesSwitch';
import { HiddenNicknamesControl } from '~/components/ChatLinkGenerator/HiddenNicknamesControl';
import { HideLinksSwitch } from '~/components/ChatLinkGenerator/HideLinksSwitch';
import { HideMessagesStartsWithInput } from '~/components/ChatLinkGenerator/HideMessagesStartsWithInput';
import { HideRewardsSwitch } from '~/components/ChatLinkGenerator/HideRewardsSwitch';
import { LinkReplacementInput } from '~/components/ChatLinkGenerator/LinkReplacementInput';
import { MaxMessagesToShowInput } from '~/components/ChatLinkGenerator/MaxMessagesToShowInput';
import { TypeSelect } from '~/components/ChatLinkGenerator/TypeSelect';

export const ChatLinkGenerator = () => {
	return (
		<>
			<TypeSelect />
			<HideMessagesStartsWithInput />
			<HideRewardsSwitch />
			<ColorControl />
			<FontInput />
			<FontSizeInput />
			<DisablePaddingSwitch />
			<MaxMessagesToShowInput />
			<HideLinksSwitch />
			<LinkReplacementInput />
			<BanWordsInput />
			<BanWordReplacementInput />
			<AnimationControl />
			<HiddenNicknamesControl />
			<GradientOnlyForCustomNicknamesSwitch />
			<CustomNicknamesControl />
		</>
	);
};
