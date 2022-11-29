import { Select } from '@mantine/core';
import { useCallback } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { ChatType } from '~/types/chatSettings';

const data: { value: ChatType; label: string }[] = [
	{ value: 'default', label: 'Default' },
	{ value: 'blocks', label: 'Blocks' },
	{ value: 'alternative-blocks', label: 'Alternative blocks' },
];

export const TypeSelect = () => {
	const currentType = useChatGenerator((state) => state.type);
	const setType = useChatGenerator((state) => state.setType);

	const handleChange = useCallback(
		(v: string | null) => {
			if (!v) return;
			setType(v as ChatType);
		},
		[setType]
	);

	return (
		<Select
			label="Type of chat widget"
			placeholder="Pick one"
			data={data}
			value={currentType}
			onChange={handleChange}
		/>
	);
};
