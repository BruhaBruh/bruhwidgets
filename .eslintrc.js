module.exports = {
	root: true,
	overrides: [
		{
			files: ['*.ts', '*.tsx'], // Your TypeScript files extension
			parserOptions: {
				project: ['./tsconfig.json'], // Specify it only for TypeScript files
			},
		},
	],
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		// Prettier plugin and recommended rules
		// 'prettier/@typescript-eslint',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
		'plugin:why/error',
		'plugin:@next/next/recommended',
		'airbnb-typescript',
		'airbnb/hooks',
		'prettier',
	],
	plugins: ['prettier'],
	rules: {
		// Include .prettierrc.js rules
		// 'prettier/prettier': ['error', {}, { usePrettierrc: true }],
		// 'react/prop-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'import/extensions': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'error',
		'react/require-default-props': [1, { ignoreFunctionalComponents: true }],
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
		'react/no-unescaped-entities': 'off',
		'react/react-in-jsx-scope': 'off',
		'arrow-body-style': 0,
		indent: ['error', 'tab'],
		'@typescript-eslint/indent': ['error', 'tab'],
		'react/jsx-indent': 'off',
		'prettier/prettier': 'error',
		'@typescript-eslint/indent': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
