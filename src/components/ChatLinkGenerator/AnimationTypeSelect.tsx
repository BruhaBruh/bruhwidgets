import { Select } from '@mantine/core';
import { useCallback, useEffect } from 'react';
import { useChatGenerator } from '~/stores/useChatGenerator';
import { ChatAnimationName } from '~/types/chatSettings';

const data: { value: ChatAnimationName; label: string }[] = [
	{ value: 'slide', label: 'Slide' },
	{ value: 'scale', label: 'Scale' },
	{ value: 'fade', label: 'Fade' },
	{ value: 'none', label: 'None' },
];

export const AnimationTypeSelect = () => {
	const animationName = useChatGenerator((state) => state.animation.name);
	const setAnimationName = useChatGenerator((state) => state.setAnimationName);
	const setAnimationTimingFunction = useChatGenerator((state) => state.setAnimationTimingFunction);
	const setAnimationOptions = useChatGenerator((state) => state.setAnimationOptions);

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
			label="Type of animation"
			placeholder="Pick one"
			data={data}
			value={animationName}
			onChange={handleChange}
		/>
	);
};
