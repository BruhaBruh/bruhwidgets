import { Switch } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const HideRewardsSwitch = () => {
	const isHideRewards = useChatGenerator((state) => state.isHideRewards);
	const setIsHideRewards = useChatGenerator((state) => state.setIsHideRewards);
	const t = useTranslation();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setIsHideRewards(e.currentTarget.checked);
		},
		[setIsHideRewards]
	);

	return (
		<Switch checked={isHideRewards} onChange={handleChange} label={t('chat-widget.hide-rewards')} />
	);
};
