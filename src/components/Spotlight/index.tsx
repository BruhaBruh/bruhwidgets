import { Kbd } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { SpotlightProvider } from '@mantine/spotlight';
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
			autoClose: false,
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
			actions={[
				{
					title: t('spotlight.location.home'),
					description: t('spotlight.location.home.description'),
					group: t('spotlight.location'),
					onTrigger: () => router.push('/'),
				},
				{
					title: t('spotlight.location.chat-widget-generator'),
					description: t('spotlight.location.chat-widget-generator.description'),
					group: t('spotlight.location'),
					onTrigger: () => router.push('/generator/chat'),
				},
				{
					title: t('spotlight.language.set-russian'),
					description: t('spotlight.language.set-russian.description'),
					group: t('spotlight.language'),
					onTrigger: () => {
						const { pathname, asPath, query } = router;
						router.push({ pathname, query }, asPath, { locale: 'ru' });
					},
				},
				{
					title: t('spotlight.language.set-english'),
					description: t('spotlight.language.set-english.description'),
					group: t('spotlight.language'),
					onTrigger: () => {
						const { pathname, asPath, query } = router;
						router.push({ pathname, query }, asPath, { locale: 'en' });
					},
				},
				{
					title: t('spotlight.theme.set-system'),
					description: t('spotlight.theme.set-system.description'),
					group: t('spotlight.theme'),
					onTrigger: () => setCurrentTheme('system'),
				},
				{
					title: t('spotlight.theme.set-dark'),
					description: t('spotlight.theme.set-dark.description'),
					group: t('spotlight.theme'),
					onTrigger: () => setCurrentTheme('dark'),
				},
				{
					title: t('spotlight.theme.set-light'),
					description: t('spotlight.theme.set-light.description'),
					group: t('spotlight.theme'),
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
