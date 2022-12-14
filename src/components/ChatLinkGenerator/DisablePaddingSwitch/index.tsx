import { Switch } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const DisablePaddingSwitch = () => {
	const isDisabledPadding = useChatGenerator((state) => state.isDisabledPadding);
	const setIsDisabledPadding = useChatGenerator((state) => state.setIsDisabledPadding);
	const t = useTranslation();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setIsDisabledPadding(e.currentTarget.checked);
		},
		[setIsDisabledPadding]
	);

	return (
		<Switch
			checked={isDisabledPadding}
			onChange={handleChange}
			label={t('chat-widget.disable-padding')}
		/>
	);
};
