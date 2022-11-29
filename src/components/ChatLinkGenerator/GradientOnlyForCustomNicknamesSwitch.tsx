import { Switch } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const GradientOnlyForCustomNicknamesSwitch = () => {
	const isGradientOnlyForCustomNicknames = useChatGenerator(
		(state) => state.isGradientOnlyForCustomNicknames
	);
	const setIsGradientOnlyForCustomNicknames = useChatGenerator(
		(state) => state.setIsGradientOnlyForCustomNicknames
	);

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
			label="Gradient only for custom nicknames"
		/>
	);
};
