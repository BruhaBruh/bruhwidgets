import { useMemo } from 'react';
import { useChat } from '~/context/ChatContext';
import { generateColors, generateLightenColor } from '~/lib/color';
import { getGradientColorsArray } from '~/lib/getGradientColorsArray';
import styles from './index.module.scss';

export type UsernameProps = {
	color: string | null;
	nickname: string;
};

export const Username: React.FC<UsernameProps> = ({ color, nickname }: UsernameProps) => {
	const defaultColor = useChat((c) => c.settings.color);
	const customNicknames = useChat((c) => c.settings.customNicknames);
	const isGradientOnlyForCustomNicknames = useChat(
		(c) => c.settings.isGradientOnlyForCustomNicknames
	);

	const gradient = useMemo(() => {
		let startColor: string = defaultColor;
		let endColor: string | undefined = undefined;

		if (Object.keys(customNicknames).includes(nickname)) {
			startColor = customNicknames[nickname].startColor;
			endColor = customNicknames[nickname].endColor;
		}

		if (isGradientOnlyForCustomNicknames) {
			if (color !== null) {
				startColor = color;
				endColor = undefined;
			} else {
				startColor = defaultColor;
				endColor = generateLightenColor(defaultColor);
			}
		} else if (color !== null) {
			[startColor, endColor] = generateColors(color, defaultColor);
		}

		return getGradientColorsArray(startColor, endColor);
	}, [color, defaultColor, customNicknames, nickname, isGradientOnlyForCustomNicknames]);

	return (
		<div className={`username ${styles.username}`}>
			<span
				className={`username__nickname ${styles.username__nickname}`}
				style={{
					background: `linear-gradient(to right, ${gradient.join(', ')})`,
					backgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				{nickname}
			</span>
		</div>
	);
};
