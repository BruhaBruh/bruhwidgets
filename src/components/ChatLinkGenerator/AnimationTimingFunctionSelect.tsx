import { Select } from '@mantine/core';
import { useCallback } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { ChatAnimationTimingFunction } from '~/types/chatSettings';

const data: { value: ChatAnimationTimingFunction; label: string }[] = [
	{ value: 'linear', label: 'Linear' },
];

export const AnimationTimingFunctionSelect = () => {
	const timingFunction = useChatGenerator((state) => state.animation.timingFunction);
	const setAnimationTimingFunction = useChatGenerator((state) => state.setAnimationTimingFunction);

	const handleChange = useCallback(
		(v: string | null) => {
			if (!v) return;
			setAnimationTimingFunction(v as ChatAnimationTimingFunction);
		},
		[setAnimationTimingFunction]
	);

	return (
		<Select
			label="Timing function for animation"
			placeholder="Pick one"
			withAsterisk
			data={data}
			value={timingFunction}
			onChange={handleChange}
		/>
	);
};
