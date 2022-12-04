import { NumberInput } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const AnimationScaleOptions = () => {
	const options = useChatGenerator((state) => state.animation.options);
	const setAnimationOptionsFn = useChatGenerator((state) => state.setAnimationOptionsFn);
	const t = useTranslation();

	const handleInitialScaleChange = useCallback(
		(v: number | undefined) => {
			if (v === undefined) return;
			setAnimationOptionsFn((opts) => ({ ...opts, initialScale: v }));
		},
		[setAnimationOptionsFn]
	);

	return (
		<>
			<NumberInput
				label={t('chat-widget.animation-initial-scale')}
				withAsterisk
				value={options.scale ? +options.scale : 0}
				onChange={handleInitialScaleChange}
				min={0}
			/>
		</>
	);
};
