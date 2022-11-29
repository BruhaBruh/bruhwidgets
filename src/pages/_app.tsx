import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
			<Component {...pageProps} />
		</MantineProvider>
	);
};

export default App;
