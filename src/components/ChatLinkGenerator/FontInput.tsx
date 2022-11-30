import { TextInput } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const FontInput = () => {
	const font = useChatGenerator((state) => state.font);
	const setFont = useChatGenerator((state) => state.setFont);
	const t = useTranslation();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setFont(e.currentTarget.value);
		},
		[setFont]
	);

	return (
		<TextInput
			label={t('chat-widget.font')}
			placeholder={t('chat-widget.font.placeholder')}
			value={font}
			onChange={handleChange}
		/>
	);
};
