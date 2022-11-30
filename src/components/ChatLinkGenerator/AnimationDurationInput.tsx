import { NumberInput } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const AnimationDurationInput = () => {
	const options = useChatGenerator((state) => state.animation.options);
	const setAnimationOptionsFn = useChatGenerator((state) => state.setAnimationOptionsFn);
	const t = useTranslation();

	const handleChange = useCallback(
		(v: number | undefined) => {
			if (!v) return;
			setAnimationOptionsFn((opts) => ({ ...opts, duration: v }));
		},
		[setAnimationOptionsFn]
	);

	return (
		<NumberInput
			label={t('chat-widget.animation-duration')}
			withAsterisk
			value={(options?.duration as number) ?? 0}
			onChange={handleChange}
			min={1}
		/>
	);
};
