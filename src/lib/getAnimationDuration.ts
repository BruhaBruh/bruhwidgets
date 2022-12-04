import { AnimationOptions } from '~/types/animation';

export const getAnimationDuration = (options: AnimationOptions) => {
	return options.duration ? +options.duration : 300;
};
