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
	{ value: 'easeInSine', label: 'Ease in sine' },
	{ value: 'easeOutSine', label: 'Ease out sine' },
	{ value: 'easeInOutSine', label: 'Ease in out sine' },
	{ value: 'easeInQuad', label: 'Ease in quad' },
	{ value: 'easeOutQuad', label: 'Ease out quad' },
	{ value: 'easeInOutQuad', label: 'Ease in out quad' },
	{ value: 'easeInCubic', label: 'Ease in cubic' },
	{ value: 'easeOutCubic', label: 'Ease out cubic' },
	{ value: 'easeInOutCubic', label: 'Ease in out cubic' },
	{ value: 'easeInQuart', label: 'Ease in quart' },
	{ value: 'easeOutQuart', label: 'Ease out quart' },
	{ value: 'easeInOutQuart', label: 'Ease in out quart' },
	{ value: 'easeInQuint', label: 'Ease in quint' },
	{ value: 'easeOutQuint', label: 'Ease out quint' },
	{ value: 'easeInOutQuint', label: 'Ease in out quint' },
	{ value: 'easeInExpo', label: 'Ease in expo' },
	{ value: 'easeOutExpo', label: 'Ease out expo' },
	{ value: 'easeInOutExpo', label: 'Ease in out expo' },
	{ value: 'easeInCirc', label: 'Ease in circ' },
	{ value: 'easeOutCirc', label: 'Ease out circ' },
	{ value: 'easeInOutCirc', label: 'Ease in out circ' },
	{ value: 'easeInBack', label: 'Ease in back' },
	{ value: 'easeOutBack', label: 'Ease out back' },
	{ value: 'easeInOutBack', label: 'Ease in out back' },
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
