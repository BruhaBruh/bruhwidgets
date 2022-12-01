import { TextInput } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const HideMessagesStartsWithInput = () => {
	const hideMessagesStartsWith = useChatGenerator((state) => state.hideMessagesStartsWith);
	const setHideMessagesStartsWith = useChatGenerator((state) => state.setHideMessagesStartsWith);
	const t = useTranslation();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setHideMessagesStartsWith(e.currentTarget.value);
		},
		[setHideMessagesStartsWith]
	);

	return (
		<TextInput
			label={t('chat-widget.hide-messages-starts-with')}
			placeholder={t('chat-widget.hide-messages-starts-with.placeholder')}
			description={t('chat-widget.hide-messages-starts-with.description')}
			value={hideMessagesStartsWith}
			onChange={handleChange}
		/>
	);
};
