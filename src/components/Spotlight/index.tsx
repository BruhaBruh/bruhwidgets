import { Kbd } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { SpotlightProvider } from '@mantine/spotlight';
import {
	IconAlphabetCyrillic,
	IconAlphabetLatin,
	IconHome,
	IconMessages,
	IconMoon,
	IconPalette,
	IconSun,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from '~/context/TranslationContext';
import { BruhitchTheme } from '~/types/theme';

export const Spotlight = ({
	children,
	setCurrentTheme,
}: {
	children: React.ReactNode;
	setCurrentTheme: (t: BruhitchTheme) => void;
}) => {
	const t = useTranslation();
	const router = useRouter();

	useEffect(() => {
		showNotification({
			color: 'red',
			title: t('spotlight.notification'),
			message: (
				<>
					{t('spotlight.notification.description').split('{}')[0]}
					<Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>
					{t('spotlight.notification.description').split('{}')[1]}
				</>
			),
		});
	}, [t]);

	return (
		<SpotlightProvider
			shortcut={['mod + K', '/']}
			actions={[
				{
					icon: <IconHome size={24} />,
					title: t('spotlight.location.home'),
					description: t('spotlight.location.home.description'),
					group: t('spotlight.location'),
					keywords: ['home', 'index', 'page', 'главная', 'страница'],
					onTrigger: () => router.push('/'),
				},
				{
					icon: <IconMessages size={24} />,
					title: t('spotlight.location.chat-widget-generator'),
					description: t('spotlight.location.chat-widget-generator.description'),
					group: t('spotlight.location'),
					keywords: ['chat', 'generator', 'page', 'чат', 'генератор', 'страница'],
					onTrigger: () => router.push('/generator/chat'),
				},
				{
					icon: <IconAlphabetCyrillic size={24} />,
					title: t('spotlight.language.set-russian'),
					description: t('spotlight.language.set-russian.description'),
					group: t('spotlight.language'),
					keywords: ['set', 'language', 'russian', 'установить', 'русский', 'язык'],
					onTrigger: () => {
						const { pathname, asPath, query } = router;
						router.push({ pathname, query }, asPath, { locale: 'ru' });
					},
				},
				{
					icon: <IconAlphabetLatin size={24} />,
					title: t('spotlight.language.set-english'),
					description: t('spotlight.language.set-english.description'),
					group: t('spotlight.language'),
					keywords: ['set', 'language', 'english', 'установить', 'русский', 'английский'],
					onTrigger: () => {
						const { pathname, asPath, query } = router;
						router.push({ pathname, query }, asPath, { locale: 'en' });
					},
				},
				{
					icon: <IconPalette size={24} />,
					title: t('spotlight.theme.set-system'),
					description: t('spotlight.theme.set-system.description'),
					group: t('spotlight.theme'),
					keywords: ['set', 'theme', 'system', 'установить', 'тема', 'системный'],
					onTrigger: () => setCurrentTheme('system'),
				},
				{
					icon: <IconMoon size={24} />,
					title: t('spotlight.theme.set-dark'),
					description: t('spotlight.theme.set-dark.description'),
					group: t('spotlight.theme'),
					keywords: ['set', 'theme', 'dark', 'установить', 'тема', 'темный'],
					onTrigger: () => setCurrentTheme('dark'),
				},
				{
					icon: <IconSun size={24} />,
					title: t('spotlight.theme.set-light'),
					description: t('spotlight.theme.set-light.description'),
					group: t('spotlight.theme'),
					keywords: ['set', 'theme', 'light', 'установить', 'тема', 'светлый'],
					onTrigger: () => setCurrentTheme('light'),
				},
			]}
			searchPlaceholder={t('spotlight.search')}
			nothingFoundMessage={t('spotlight.not-found')}
		>
			{children}
		</SpotlightProvider>
	);
};
