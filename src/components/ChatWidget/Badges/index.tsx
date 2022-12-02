// eslint-why dont use nextjs image optimization. Highload
/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react';
import type { Badges as TBadges } from 'tmi.js';
import { useChat } from '~/context/ChatContext';
import styles from './index.module.scss';

export type BadgeProps = {
	badges: TBadges;
};

export const Badges: React.FC<BadgeProps> = ({ badges }: BadgeProps) => {
	const loadedBadges = useChat((c) => c.badges);
	const badgeImages: string[] = useMemo(() => {
		return Object.entries(badges)
			.map(([key, value]) => {
				const versions = loadedBadges.find((b) => b.set_id === key)?.versions;
				return versions?.find((v) => v.id === value)?.image_url_4x;
			})
			.filter(Boolean) as string[];
	}, [badges, loadedBadges]);

	if (badgeImages.length === 0) return <></>;

	return (
		<span className={`badges ${styles.badges}`}>
			{badgeImages.map((badge) => (
				<span key={badge} className={`badges__badge ${styles.badges__badge}`}>
					<img className={`badges__image ${styles.badges__image}`} src={badge} alt="" />
				</span>
			))}
		</span>
	);
};
