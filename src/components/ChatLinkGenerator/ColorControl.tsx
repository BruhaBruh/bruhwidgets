import { ColorPicker, DEFAULT_THEME, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

// eslint-why React.FC already with props
// eslint-disable-next-line react/prop-types
const NicknamePreview: React.FC<{ color: string }> = ({ color }) => {
	const t = useTranslation();
	return (
		<Text>
			{t('preview')}:{' '}
			<span
				style={{
					color: color,
				}}
			>
				BruhaBruh
			</span>
		</Text>
	);
};

export const ColorControl = () => {
	const color = useChatGenerator((state) => state.color);
	const [currentColor, setCurrentColor] = useState(color);
	const [debouncedColor] = useDebouncedValue(currentColor, 250);
	const setColor = useChatGenerator((state) => state.setColor);
	const t = useTranslation();

	const handleChange = useCallback(
		(c: string) => {
			setCurrentColor(c);
		},
		[setCurrentColor]
	);

	const handleInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setCurrentColor(e.currentTarget.value);
		},
		[setCurrentColor]
	);

	useEffect(() => {
		setColor(debouncedColor);
	}, [debouncedColor, setColor]);

	return (
		<Stack spacing="xs">
			<Text fz="sm">{t('chat-widget.nickname-color')}</Text>
			<TextInput value={currentColor} onChange={handleInputChange} placeholder={t('hex-color')} />
			<ColorPicker
				value={currentColor}
				onChange={handleChange}
				fullWidth
				format="hex"
				size="xl"
				swatchesPerRow={30}
				swatches={[
					...DEFAULT_THEME.colors.red,
					...DEFAULT_THEME.colors.lime,
					...DEFAULT_THEME.colors.blue,
					...DEFAULT_THEME.colors.violet,
					...DEFAULT_THEME.colors.teal,
					...DEFAULT_THEME.colors.indigo,
				]}
			/>
			<NicknamePreview color={currentColor} />
		</Stack>
	);
};
