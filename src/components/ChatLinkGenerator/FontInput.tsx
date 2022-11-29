import { TextInput } from '@mantine/core';
import { ChangeEvent, useCallback } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const FontInput = () => {
	const font = useChatGenerator((state) => state.font);
	const setFont = useChatGenerator((state) => state.setFont);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setFont(e.currentTarget.value);
		},
		[setFont]
	);

	return (
		<TextInput label="Font" placeholder="Your font or empty" value={font} onChange={handleChange} />
	);
};
