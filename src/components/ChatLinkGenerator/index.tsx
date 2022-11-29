import { AnimationControl } from '~/components/ChatLinkGenerator/AnimationControl';
import { ColorControl } from '~/components/ChatLinkGenerator/ColorControl';
import { CustomNicknamesControl } from '~/components/ChatLinkGenerator/CustomNicknamesControl';
import { DisablePaddingSwitch } from '~/components/ChatLinkGenerator/DisablePaddingSwitch';
import { FontInput } from '~/components/ChatLinkGenerator/FontInput';
import { FontSizeInput } from '~/components/ChatLinkGenerator/FontSizeInput';
import { GradientOnlyForCustomNicknamesSwitch } from '~/components/ChatLinkGenerator/GradientOnlyForCustomNicknamesSwitch';
import { HiddenNicknamesControl } from '~/components/ChatLinkGenerator/HiddenNicknamesControl';
import { HideRewardsSwitch } from '~/components/ChatLinkGenerator/HideRewardsSwitch';
import { TypeSelect } from '~/components/ChatLinkGenerator/TypeSelect';

export const ChatLinkGenerator = () => {
	return (
		<>
			<TypeSelect />
			<HideRewardsSwitch />
			<ColorControl />
			<FontInput />
			<FontSizeInput />
			<DisablePaddingSwitch />
			<AnimationControl />
			<HiddenNicknamesControl />
			<GradientOnlyForCustomNicknamesSwitch />
			<CustomNicknamesControl />
		</>
	);
};
