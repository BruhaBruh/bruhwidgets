/** @type {import("next").NextConfig} */
module.exports = {
	poweredByHeader: false,
	images: {
		domains: ['static-cdn.jtvnw.net', 'cdn.betterttv.net', 'cdn.7tv.app', 'cdn.frankerfacez.com'],
	},
	i18n: {
		locales: ['en', 'ru'],
		defaultLocale: 'en',
	},
};
