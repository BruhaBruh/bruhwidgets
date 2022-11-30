import React, { createContext, useCallback, useContext } from 'react';
import { enLocale } from '~/locales/en';
import { ruLocale } from '~/locales/ru';
import { Locale, LocaleTranslation } from '~/types/locale';

export const TranslationContext = createContext<LocaleTranslation>(enLocale);

export const TranslationProvider = ({
	locale,
	children,
}: {
	locale: Locale;
	children: React.ReactNode;
}) => {
	return (
		<TranslationContext.Provider value={locale === 'en' ? enLocale : ruLocale}>
			{children}
		</TranslationContext.Provider>
	);
};

export const useTranslation = () => {
	const translation = useContext(TranslationContext);

	const t = useCallback(
		(key: keyof LocaleTranslation, ...args: unknown[]) => {
			let value = (translation as Record<string, string>)[key];
			if (!value) return key;
			args.forEach((arg) => {
				value = value.replace(/{}/, arg as string);
			});
			return value;
		},
		[translation]
	);

	return t;
};
