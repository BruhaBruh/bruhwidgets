import { Select } from '@mantine/core';
import { useCallback, useEffect } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { ChatAnimationName } from '~/types/chatSettings';

export const AnimationTypeSelect = () => {
	const animationName = useChatGenerator((state) => state.animation.name);
	const setAnimationName = useChatGenerator((state) => state.setAnimationName);
	const setAnimationTimingFunction = useChatGenerator((state) => state.setAnimationTimingFunction);
	const setAnimationOptions = useChatGenerator((state) => state.setAnimationOptions);
	const t = useTranslation();

	const handleChange = useCallback(
		(v: string | null) => {
			if (!v) return;
			setAnimationName(v as ChatAnimationName);
		},
		[setAnimationName]
	);

	useEffect(() => {
		if (animationName === 'none') {
			setAnimationTimingFunction(undefined);
			setAnimationOptions(undefined);
		} else if (animationName === 'fade') {
			setAnimationTimingFunction('linear');
			setAnimationOptions({ duration: 150 });
		} else if (animationName === 'scale') {
			setAnimationTimingFunction('linear');
			setAnimationOptions({ duration: 150, initialScale: 0 });
		} else if (animationName === 'slide') {
			setAnimationTimingFunction('linear');
			setAnimationOptions({ duration: 150 });
		}
	}, [animationName, setAnimationTimingFunction, setAnimationOptions]);

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
