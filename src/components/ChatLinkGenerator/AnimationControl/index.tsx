import { AnimationOptions } from '~/components/ChatLinkGenerator/AnimationControl/AnimationOptions';
import { AnimationTimingFunctionSelect } from '~/components/ChatLinkGenerator/AnimationControl/AnimationTimingFunctionSelect';
import { AnimationTypeSelect } from '~/components/ChatLinkGenerator/AnimationControl/AnimationTypeSelect';

export const AnimationControl = () => {
	return (
		<>
			<AnimationTypeSelect />
			<AnimationTimingFunctionSelect />
			<AnimationOptions />
		</>
	);
};
