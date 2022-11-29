import { ColorPicker, DEFAULT_THEME, Stack, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const ColorControl = () => {
	const color = useChatGenerator((state) => state.color);
	const [currentColor, setCurrentColor] = useState(color);
	const [debouncedColor] = useDebouncedValue(currentColor, 250);
	const setColor = useChatGenerator((state) => state.setColor);

	const handleChange = useCallback(
		(c: string) => {
			setCurrentColor(c);
		},
		[setCurrentColor]
	);

	useEffect(() => {
		setColor(debouncedColor);
	}, [debouncedColor, setColor]);

	return (
		<Stack spacing="xs">
			<Text fz="sm">Nickname color</Text>
			<ColorPicker
				value={currentColor}
				onChange={handleChange}
				fullWidth
				format="hex"
				size="xl"
				swatchesPerRow={30}
				swatches={[
					...DEFAULT_THEME.colors.red,
					...DEFAULT_THEME.colors.violet,
					...DEFAULT_THEME.colors.teal,
					...DEFAULT_THEME.colors.lime,
					...DEFAULT_THEME.colors.blue,
					...DEFAULT_THEME.colors.indigo,
				]}
			/>
		</Stack>
	);
};
