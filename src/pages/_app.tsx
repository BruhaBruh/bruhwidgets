import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Fab } from '~/components/Fab';
import { Spotlight } from '~/components/Spotlight';
import { TranslationProvider } from '~/context/TranslationContext';
import { isValidTheme } from '~/lib/isValidTheme';
import { Locale } from '~/types/locale';
import { BruhitchTheme } from '~/types/theme';

type Props = {
	theme: BruhitchTheme;
};

const App = ({ Component, pageProps, theme }: AppProps & Props) => {
	const router = useRouter();
	const preferedColorScheme = useColorScheme('dark', { getInitialValueInEffect: false });
	const [currentTheme, setCurrentTheme] = useState(theme);

	const setTheme = useCallback(
		(v: BruhitchTheme) => {
			if (!isValidTheme(v)) return;
			setCurrentTheme(v as BruhitchTheme);
			const headers = new Headers();
			headers.set('Content-Type', 'application/json; charset=UTF8');
			fetch('/api/theme', { method: 'POST', headers, body: JSON.stringify({ theme: v }) });
		},
		[setCurrentTheme]
	);

	if (router.pathname.startsWith('/widget')) return <Component {...pageProps} />;
	return (
		<TranslationProvider locale={(router.locale as Locale) ?? 'en'}>
			<MantineProvider
				theme={{
					colorScheme:
						currentTheme === 'system' ? preferedColorScheme : (currentTheme as 'light' | 'dark'),
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<NotificationsProvider>
					<Spotlight setCurrentTheme={setTheme}>
						<Fab />
						<Component {...pageProps} />
					</Spotlight>
				</NotificationsProvider>
			</MantineProvider>
		</TranslationProvider>
	);
};

App.getInitialProps = async ({ ctx }: AppContext): Promise<Props> => {
	const { req, res } = ctx;

	const themeCookie = getCookie('bruhitch-theme', { req, res });
	let theme: BruhitchTheme = 'system';
	if (themeCookie && isValidTheme(themeCookie.toString())) {
		theme = themeCookie.toString() as BruhitchTheme;
	} else {
		setCookie('bruhitch-theme', theme, {
			req,
			res,
			maxAge: 60 * 60 * 24 * 30 * 12 * 25,
		});
	}

	return {
		theme,
	};
};

export default App;
