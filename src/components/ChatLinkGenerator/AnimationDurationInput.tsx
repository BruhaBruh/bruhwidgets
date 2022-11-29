import { NumberInput } from '@mantine/core';
import { useCallback } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const AnimationDurationInput = () => {
	const options = useChatGenerator((state) => state.animation.options);
	const setAnimationOptionsFn = useChatGenerator((state) => state.setAnimationOptionsFn);

	const handleChange = useCallback(
		(v: number | undefined) => {
			if (!v) return;
			setAnimationOptionsFn((opts) => ({ ...opts, duration: v }));
		},
		[setAnimationOptionsFn]
	);

	return (
		<NumberInput
			label="Animation duration in milliseconds"
			withAsterisk
			value={(options?.duration as number) ?? 0}
			onChange={handleChange}
			min={1}
		/>
	);
};
