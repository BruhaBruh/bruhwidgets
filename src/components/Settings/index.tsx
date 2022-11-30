import { Select, Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useTranslation } from '~/context/TranslationContext';

export const Settings = ({
	currentTheme,
	onChange,
}: {
	currentTheme: string;
	onChange: (v: string | null) => void;
}) => {
	const router = useRouter();
	const t = useTranslation();

	const handleChangeLocale = useCallback(
		(v: string | null) => {
			if (!v) return;
			const { pathname, asPath, query } = router;
			router.push({ pathname, query }, asPath, { locale: v });
		},
		[router]
	);

	return (
		<Stack
			spacing="sm"
			sx={{
				position: 'fixed',
				top: '1rem',
				left: '1rem',
			}}
		>
			<Select
				label={t('theme')}
				value={currentTheme}
				onChange={onChange}
				data={[
					{ value: 'system', label: t('theme.system') },
					{ value: 'light', label: t('theme.light') },
					{ value: 'dark', label: t('theme.dark') },
				]}
			/>
			<Select
				label={t('locale')}
				value={router.locale ?? 'en'}
				onChange={handleChangeLocale}
				data={[
					{ value: 'ru', label: t('locale.ru') },
					{ value: 'en', label: t('locale.en') },
				]}
			/>
		</Stack>
	);
};
