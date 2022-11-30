import { Switch } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const GradientOnlyForCustomNicknamesSwitch = () => {
	const isGradientOnlyForCustomNicknames = useChatGenerator(
		(state) => state.isGradientOnlyForCustomNicknames
	);
	const setIsGradientOnlyForCustomNicknames = useChatGenerator(
		(state) => state.setIsGradientOnlyForCustomNicknames
	);
	const t = useTranslation();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setIsGradientOnlyForCustomNicknames(e.currentTarget.checked);
		},
		[setIsGradientOnlyForCustomNicknames]
	);

	return (
		<Switch
			checked={isGradientOnlyForCustomNicknames}
			onChange={handleChange}
			label={t('chat-widget.gradient-only-for-custom-nicknames')}
		/>
	);
};
