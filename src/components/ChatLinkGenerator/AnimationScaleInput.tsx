import { NumberInput } from '@mantine/core';
import { useCallback } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const AnimationScaleInput = () => {
	const options = useChatGenerator((state) => state.animation.options);
	const setAnimationOptionsFn = useChatGenerator((state) => state.setAnimationOptionsFn);

	const handleChange = useCallback(
		(v: number | undefined) => {
			if (v === undefined) return;
			setAnimationOptionsFn((opts) => ({ ...opts, initialScale: v }));
		},
		[setAnimationOptionsFn]
	);

	return (
		<NumberInput
			label="Animation initial scale. Where 1 is 100%"
			withAsterisk
			value={(options?.scale as number) ?? 0}
			onChange={handleChange}
			min={0}
		/>
	);
};
