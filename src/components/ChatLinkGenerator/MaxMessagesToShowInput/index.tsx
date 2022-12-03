import { NumberInput } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const MaxMessagesToShowInput = () => {
	const maxMessagesToShow = useChatGenerator((state) => state.maxMessagesToShow);
	const setMaxMessagesToShow = useChatGenerator((state) => state.setMaxMessagesToShow);
	const t = useTranslation();

	const handleChange = useCallback(
		(v: number | undefined) => {
			if (!v) return;
			setMaxMessagesToShow(v);
		},
		[setMaxMessagesToShow]
	);

	return (
		<NumberInput
			label={t('chat-widget.max-messages-to-show')}
			description={t('chat-widget.max-messages-to-show.description')}
			withAsterisk
			value={maxMessagesToShow}
			onChange={handleChange}
			min={1}
			max={100}
		/>
	);
};
