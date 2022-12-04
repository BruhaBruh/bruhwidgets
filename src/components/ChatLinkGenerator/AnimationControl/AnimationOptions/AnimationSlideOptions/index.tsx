import { Select } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { useChatGenerator } from '~/stores/useChatGenerator';

export const AnimationSlideOptions = () => {
	const options = useChatGenerator((state) => state.animation.options);
	const setAnimationOptionsFn = useChatGenerator((state) => state.setAnimationOptionsFn);
	const t = useTranslation();

	const handleSlideDirectionChange = useCallback(
		(v: string | null) => {
			if (!v) return;
			setAnimationOptionsFn((o) => ({ ...o, fromDirection: v }));
		},
		[setAnimationOptionsFn]
	);

	return (
		<>
			<Select
				label={t('chat-widget.animation-slide-direction')}
				data={[
					{ value: 'top', label: t('chat-widget.animation-slide-direction.top') },
					{ value: 'bottom', label: t('chat-widget.animation-slide-direction.bottom') },
					{ value: 'left', label: t('chat-widget.animation-slide-direction.left') },
					{ value: 'right', label: t('chat-widget.animation-slide-direction.right') },
				]}
				value={typeof options.fromDirection === 'string' ? options.fromDirection : 'right'}
				onChange={handleSlideDirectionChange}
			/>
		</>
	);
};
