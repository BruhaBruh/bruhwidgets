import { AnimationDurationInput } from '~/components/ChatLinkGenerator/AnimationDurationInput';
import { AnimationScaleInput } from '~/components/ChatLinkGenerator/AnimationScaleInput';
import { AnimationTimingFunctionSelect } from '~/components/ChatLinkGenerator/AnimationTimingFunctionSelect';
import { AnimationTypeSelect } from '~/components/ChatLinkGenerator/AnimationTypeSelect';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const AnimationControl = () => {
	const animationName = useChatGenerator((state) => state.animation.name);
	return (
		<>
			<AnimationTypeSelect />
			{animationName !== 'none' && <AnimationTimingFunctionSelect />}
			{animationName !== 'none' && <AnimationDurationInput />}
			{animationName === 'scale' && <AnimationScaleInput />}
		</>
	);
};
