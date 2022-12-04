import { Select } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { AnimationName } from '~/types/animation';

export const AnimationTypeSelect = () => {
	const animationName = useChatGenerator((state) => state.animation.name);
	const setAnimationName = useChatGenerator((state) => state.setAnimationName);
	const t = useTranslation();

	const handleChange = useCallback(
		(v: string | null) => {
			if (!v) return;
			setAnimationName(v as AnimationName);
		},
		[setAnimationName]
	);

	return (
		<Select
			label={t('chat-widget.animation-type')}
			data={[
				{ value: 'slide', label: t('chat-widget.animation-type.slide') },
				{ value: 'scale', label: t('chat-widget.animation-type.scale') },
				{ value: 'fade', label: t('chat-widget.animation-type.fade') },
				{ value: 'none', label: t('chat-widget.animation-type.none') },
			]}
			value={animationName}
			onChange={handleChange}
		/>
	);
};
