import { NumberInput } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const FontSizeInput = () => {
	const fontSize = useChatGenerator((state) => state.fontSize);
	const setFontSize = useChatGenerator((state) => state.setFontSize);
	const t = useTranslation();

	const handleChange = useCallback(
		(v: number | undefined) => {
			if (!v) return;
			setFontSize(v);
		},
		[setFontSize]
	);

	return (
		<NumberInput
			label={t('chat-widget.font-size')}
			withAsterisk
			value={fontSize}
			onChange={handleChange}
			min={1}
		/>
	);
};
