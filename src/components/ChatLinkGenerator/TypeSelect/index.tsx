import { Select } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { ChatType } from '~/types/chatSettings';

export const TypeSelect = () => {
	const currentType = useChatGenerator((state) => state.type);
	const setType = useChatGenerator((state) => state.setType);
	const t = useTranslation();

	const handleChange = useCallback(
		(v: string | null) => {
			if (!v) return;
			setType(v as ChatType);
		},
		[setType]
	);

	return (
		<Select
			label={t('chat-widget.type')}
			data={[
				{ value: 'default', label: t('chat-widget.type.default') },
				{ value: 'blocks', label: t('chat-widget.type.blocks') },
				{ value: 'alternative-blocks', label: t('chat-widget.type.alternative-blocks') },
			]}
			value={currentType}
			onChange={handleChange}
		/>
	);
};
