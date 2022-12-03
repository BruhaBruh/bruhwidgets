import { Switch } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const HideLinksSwitch = () => {
	const isHideLinks = useChatGenerator((state) => state.isHideLinks);
	const setIsHideLinks = useChatGenerator((state) => state.setIsHideLinks);
	const t = useTranslation();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setIsHideLinks(e.currentTarget.checked);
		},
		[setIsHideLinks]
	);

	return (
		<Switch checked={isHideLinks} onChange={handleChange} label={t('chat-widget.hide-links')} />
	);
};
