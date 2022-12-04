import { AnimationDurationInput } from '~/components/ChatLinkGenerator/AnimationControl/AnimationOptions/AnimationDurationInput';
import { AnimationScaleOptions } from '~/components/ChatLinkGenerator/AnimationControl/AnimationOptions/AnimationScaleOptions';
import { AnimationSlideOptions } from '~/components/ChatLinkGenerator/AnimationControl/AnimationOptions/AnimationSlideOptions';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const AnimationOptions = () => {
	const animationName = useChatGenerator((state) => state.animation.name);

	if (animationName === 'none') return null;

	return (
		<>
			<AnimationDurationInput />
			{animationName === 'scale' && <AnimationScaleOptions />}
			{animationName === 'slide' && <AnimationSlideOptions />}
		</>
	);
};
