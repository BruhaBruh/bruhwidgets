import { Select } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { AnimationTimingFunction } from '~/types/animation';

const data: { value: AnimationTimingFunction; label: string }[] = [
	{ value: 'linear', label: 'Linear' },
	{ value: 'ease', label: 'Ease' },
	{ value: 'easeIn', label: 'Ease in' },
	{ value: 'easeOut', label: 'Ease out' },
	{ value: 'easeInOut', label: 'Ease in out' },
	{ value: 'easeInSine', label: 'Ease in Sine' },
	{ value: 'easeOutSine', label: 'Ease out Sine' },
	{ value: 'easeInOutSine', label: 'Ease in out Sine' },
	{ value: 'easeInQuad', label: 'Ease in Quad' },
	{ value: 'easeOutQuad', label: 'Ease out Quad' },
	{ value: 'easeInOutQuad', label: 'Ease in out Quad' },
	{ value: 'easeInCubic', label: 'Ease in Cubic' },
	{ value: 'easeOutCubic', label: 'Ease out Cubic' },
	{ value: 'easeInOutCubic', label: 'Ease in out Cubic' },
	{ value: 'easeInQuart', label: 'Ease in Quart' },
	{ value: 'easeOutQuart', label: 'Ease out Quart' },
	{ value: 'easeInOutQuart', label: 'Ease in out Quart' },
	{ value: 'easeInQuint', label: 'Ease in Quint' },
	{ value: 'easeOutQuint', label: 'Ease out Quint' },
	{ value: 'easeInOutQuint', label: 'Ease in out Quint' },
	{ value: 'easeInExpo', label: 'Ease in Expo' },
	{ value: 'easeOutExpo', label: 'Ease out Expo' },
	{ value: 'easeInOutExpo', label: 'Ease in out Expo' },
	{ value: 'easeInCirc', label: 'Ease in Circ' },
	{ value: 'easeOutCirc', label: 'Ease out Circ' },
	{ value: 'easeInOutCirc', label: 'Ease in out Circ' },
	{ value: 'easeInBack', label: 'Ease in Back' },
	{ value: 'easeOutBack', label: 'Ease out Back' },
	{ value: 'easeInOutBack', label: 'Ease in out Back' },
];

export const AnimationTimingFunctionSelect = () => {
	const animationName = useChatGenerator((state) => state.animation.name);
	const timingFunction = useChatGenerator((state) => state.animation.timingFunction);
	const setAnimationTimingFunction = useChatGenerator((state) => state.setAnimationTimingFunction);
	const t = useTranslation();

	const handleChange = useCallback(
		(v: string | null) => {
			if (!v) return;
			setAnimationTimingFunction(v as AnimationTimingFunction);
		},
		[setAnimationTimingFunction]
	);

	if (animationName === 'none') return null;

	return (
		<Select
			label={t('chat-widget.animation-timing-function')}
			withAsterisk
			data={data}
			value={timingFunction}
			onChange={handleChange}
		/>
	);
};
