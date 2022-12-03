import { TextInput } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const BanWordReplacementInput = () => {
	const banWordReplacement = useChatGenerator((state) => state.banWordReplacement);
	const setBanWordReplacement = useChatGenerator((state) => state.setBanWordReplacement);
	const t = useTranslation();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setBanWordReplacement(e.currentTarget.value.trim());
		},
		[setBanWordReplacement]
	);

	return (
		<TextInput
			label={t('chat-widget.ban-word-replacement')}
			placeholder={t('chat-widget.ban-word-replacement.placeholder')}
			description={t('chat-widget.ban-word-replacement.description')}
			value={banWordReplacement}
			onChange={handleChange}
		/>
	);
};
