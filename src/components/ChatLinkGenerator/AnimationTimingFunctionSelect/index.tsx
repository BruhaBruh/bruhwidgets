import { Select } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { ChatAnimationTimingFunction } from '~/types/chatSettings';

const data: { value: ChatAnimationTimingFunction; label: string }[] = [
	{ value: 'linear', label: 'Linear' },
];

export const AnimationTimingFunctionSelect = () => {
	const timingFunction = useChatGenerator((state) => state.animation.timingFunction);
	const setAnimationTimingFunction = useChatGenerator((state) => state.setAnimationTimingFunction);
	const t = useTranslation();

	const handleChange = useCallback(
		(v: string | null) => {
			if (!v) return;
			setAnimationTimingFunction(v as ChatAnimationTimingFunction);
		},
		[setAnimationTimingFunction]
	);

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
