import { Select } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { AnimationTimingFunction } from '~/types/animation';

const data: { value: AnimationTimingFunction; label: string }[] = [
	{ value: 'linear', label: 'Linear' },
	{ value: 'ease', label: 'Ease' },
	{ value: 'ease-in', label: 'Ease in' },
	{ value: 'ease-out', label: 'Ease out' },
	{ value: 'ease-in-out', label: 'Ease in out' },
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
