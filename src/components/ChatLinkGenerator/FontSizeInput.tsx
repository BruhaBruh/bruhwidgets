import { NumberInput } from '@mantine/core';
import { useCallback } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const FontSizeInput = () => {
	const fontSize = useChatGenerator((state) => state.fontSize);
	const setFontSize = useChatGenerator((state) => state.setFontSize);

	const handleChange = useCallback(
		(v: number | undefined) => {
			if (!v) return;
			setFontSize(v);
		},
		[setFontSize]
	);

	return (
		<NumberInput label="Font Size" withAsterisk value={fontSize} onChange={handleChange} min={1} />
	);
};
