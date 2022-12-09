import { CSSProperties } from 'react';
import { TransitionStatus } from 'react-transition-group';
import { easings } from '~/lib/easings';
import { getAnimationDuration } from '~/lib/getAnimationDuration';
import { AnimationName, AnimationOptions, AnimationTimingFunction } from '~/types/animation';

const getFadeAnimationStyle = (
	status: TransitionStatus,
	timingFunction: AnimationTimingFunction,
	options: AnimationOptions
): CSSProperties => {
	const duration = getAnimationDuration(options);
	const defaultStyle: CSSProperties = {
		transition: `opacity ${duration}ms ${easings[timingFunction]}`,
		opacity: 0,
	};
	const transitionStyles: Record<TransitionStatus, CSSProperties> = {
		entering: { opacity: 1 },
		entered: { opacity: 1 },
		exiting: { opacity: 0 },
		exited: { opacity: 0 },
		unmounted: { opacity: 0 },
	};

	return { ...defaultStyle, ...transitionStyles[status] };
};

const getScaleAnimationStyle = (
	status: TransitionStatus,
	timingFunction: AnimationTimingFunction,
	options: AnimationOptions
): CSSProperties => {
	const duration = getAnimationDuration(options);
	const initialScale = options.initialScale ? +options.initialScale : 0;
	const defaultStyle: CSSProperties = {
		transition: `transform ${duration}ms ${easings[timingFunction]}`,
		transform: `scale(${initialScale})`,
	};
	const transitionStyles: Record<TransitionStatus, CSSProperties> = {
		entering: { transform: `scale(1)`, opacity: 1 },
		entered: { transform: `scale(1)`, opacity: 1 },
		exiting: { transform: `scale(${initialScale})`, opacity: 0 },
		exited: { transform: `scale(${initialScale})`, opacity: 0 },
		unmounted: { transform: `scale(${initialScale})`, opacity: 0 },
	};

	return { ...defaultStyle, ...transitionStyles[status] };
};

const getSlideAnimationStyle = (
	status: TransitionStatus,
	timingFunction: AnimationTimingFunction,
	options: AnimationOptions
): CSSProperties => {
	const duration = getAnimationDuration(options);
	const fromDirection = (
		typeof options.fromDirection === 'string' ? options.fromDirection : 'right'
	) as 'left' | 'right' | 'top' | 'bottom';
	const initialTranform =
		fromDirection === 'top' || fromDirection === 'bottom'
			? `translateY(${fromDirection === 'top' ? '-' : ''}100%)`
			: `translateX(${fromDirection === 'left' ? '-' : ''}100%)`;
	const endTranform =
		fromDirection === 'top' || fromDirection === 'bottom' ? 'translateY(0)' : 'translateX(0)';
	const defaultStyle: CSSProperties = {
		transition: `transform ${duration}ms ${easings[timingFunction]}`,
		transform: initialTranform,
	};
	const transitionStyles: Record<TransitionStatus, CSSProperties> = {
		entering: { transform: endTranform, opacity: 1 },
		entered: { transform: endTranform, opacity: 1 },
		exiting: { transform: initialTranform, opacity: 0 },
		exited: { transform: initialTranform, opacity: 0 },
		unmounted: { transform: initialTranform, opacity: 0 },
	};

	return { ...defaultStyle, ...transitionStyles[status] };
};

export const getAnimationStyle = (
	status: TransitionStatus,
	animation: AnimationName,
	timingFunction: AnimationTimingFunction,
	options: AnimationOptions
): CSSProperties => {
	if (animation === 'fade') return getFadeAnimationStyle(status, timingFunction, options);
	if (animation === 'scale') return getScaleAnimationStyle(status, timingFunction, options);
	if (animation === 'slide') return getSlideAnimationStyle(status, timingFunction, options);
	return {};
};
