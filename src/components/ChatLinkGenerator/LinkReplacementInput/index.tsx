import { TextInput } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const LinkReplacementInput = () => {
	const linkReplacement = useChatGenerator((state) => state.linkReplacement);
	const setLinkReplacement = useChatGenerator((state) => state.setLinkReplacement);
	const t = useTranslation();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setLinkReplacement(e.currentTarget.value.trim());
		},
		[setLinkReplacement]
	);

	return (
		<TextInput
			label={t('chat-widget.link-replacement')}
			placeholder={t('chat-widget.link-replacement.placeholder')}
			description={t('chat-widget.link-replacement.description')}
			value={linkReplacement}
			onChange={handleChange}
		/>
	);
};
