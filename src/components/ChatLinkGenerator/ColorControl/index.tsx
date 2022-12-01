import {
	ActionIcon,
	Box,
	ColorPicker,
	DEFAULT_THEME,
	Stack,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { useClipboard, useDebouncedValue } from '@mantine/hooks';
import { IconCopy } from '@tabler/icons';
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
	const clipboard = useClipboard({ timeout: 500 });
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
			<TextInput
				icon={
					<Box
						sx={{
							width: 14,
							height: 14,
							backgroundColor: currentColor,
							borderRadius: 4,
						}}
					/>
				}
				rightSection={
					<Tooltip label={clipboard.copied ? t('copied') : t('copy.tooltip')}>
						<ActionIcon onClick={() => clipboard.copy(currentColor)}>
							<IconCopy size={18} />
						</ActionIcon>
					</Tooltip>
				}
				value={currentColor}
				onChange={handleInputChange}
				placeholder={t('hex-color')}
			/>
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
