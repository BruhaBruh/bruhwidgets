// eslint-why dont use nextjs image optimization. Highload
/* eslint-disable @next/next/no-img-element */
import { useMemo } from 'react';
import { useChat } from '~/context/ChatContext';
import styles from './index.module.scss';

export type TextProps = { message: string };

export const Text: React.FC<TextProps> = ({ message }: TextProps) => {
	const emotes = useChat((c) => c.emotes);
	const parsedMessage = useMemo(() => {
		const words = message.split(' ').filter((v) => v.trim() !== '');
		const wordsOrEmotes: {
			service?: 'twitch' | 'stv' | 'newstv' | 'bttv' | 'ffz';
			value: string;
		}[] = [];

		let text = '';
		words.forEach((v) => {
			if (/^<!\S*!>$/.test(v)) {
				if (text !== '') {
					wordsOrEmotes.push({ value: text.trim() });
					text = '';
				}
				wordsOrEmotes.push({ service: 'twitch', value: v });
				return;
			}
			if (emotes.stv.find((e) => e.name === v)) {
				if (text !== '') {
					wordsOrEmotes.push({ value: text.trim() });
					text = '';
				}
				wordsOrEmotes.push({ service: 'stv', value: v });
				return;
			}
			if (emotes.stvNew.find((e) => e.name === v)) {
				if (text !== '') {
					wordsOrEmotes.push({ value: text.trim() });
					text = '';
				}
				wordsOrEmotes.push({ service: 'newstv', value: v });
				return;
			}
			if (emotes.bttv.emotes.find((e) => e.code === v)) {
				if (text !== '') {
					wordsOrEmotes.push({ value: text.trim() });
					text = '';
				}
				wordsOrEmotes.push({ service: 'bttv', value: v });
				return;
			}
			if (emotes.ffz.find((e) => e.name === v)) {
				if (text !== '') {
					wordsOrEmotes.push({ value: text.trim() });
					text = '';
				}
				wordsOrEmotes.push({ service: 'ffz', value: v });
				return;
			}
			text = `${text} ${v}`;
		});
		if (text !== '') wordsOrEmotes.push({ value: text.trim() });

		return wordsOrEmotes.map(({ value, service }, index) => {
			if (service === 'twitch') {
				const template = 'https://static-cdn.jtvnw.net/emoticons/v2/{id}/default/dark/3.0';
				const id = value.match(/^<!(\S*)!>$/);
				const image = template.replace('{id}', id?.[1] ?? '');
				return (
					<span key={value + index} className={`text__emote ${styles.text__emote}`}>
						<img
							className={`text__emote-image ${styles['text__emote-image']}`}
							src={image}
							alt=""
						/>
					</span>
				);
			}
			if (service === 'bttv') {
				const image = emotes.bttv.template.replace(
					'{id}',
					emotes.bttv.emotes.find((e) => e.code === value)?.id ?? ''
				);
				return (
					<span key={value + index} className={`text__emote ${styles.text__emote}`}>
						<img
							className={`text__emote-image ${styles['text__emote-image']}`}
							src={image}
							alt=""
						/>
					</span>
				);
			}
			if (service === 'stv') {
				const urls = emotes.stv.find((e) => e.name === value)?.urls ?? [[]];
				const image = urls[urls.length - 1][1];
				return (
					<span key={value + index} className={`text__emote ${styles.text__emote}`}>
						<img
							className={`text__emote-image ${styles['text__emote-image']}`}
							src={image}
							alt=""
						/>
					</span>
				);
			}
			if (service === 'newstv') {
				const emote = emotes.stvNew.find((e) => e.name === value);
				const id = emote?.data.id;
				const file = emote?.data.host.files.toReversed().find((v) => v.name.endsWith('.webp'));
				const url = `https://cdn.7tv.app/emote/${id}/${file}`;
				return (
					<span key={value + index} className={`text__emote ${styles.text__emote}`}>
						<img className={`text__emote-image ${styles['text__emote-image']}`} src={url} alt="" />
					</span>
				);
			}
			if (service === 'ffz') {
				const ffzEmote = emotes.ffz.find((e) => e.name === value);
				if (ffzEmote) {
					const keys = Object.keys(ffzEmote.urls);
					const image = `https:${ffzEmote.urls[keys[keys.length - 1]]}`;
					return (
						<span key={value + index} className={`text__emote ${styles.text__emote}`}>
							<img
								className={`text__emote-image ${styles['text__emote-image']}`}
								src={image}
								alt=""
							/>
						</span>
					);
				}
			}

			return (
				<span key={value + index} className={`text__words ${styles.text__words}`}>
					{value}&nbsp;
				</span>
			);
		});
	}, [message, emotes]);

	return (
		<span className={`text ${styles.text}`} style={{ position: 'relative' }}>
			{parsedMessage}
		</span>
	);
};
