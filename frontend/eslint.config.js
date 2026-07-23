import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
//import pluginMobx from 'eslint-plugin-mobx';

import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores(['dist']),
	//pluginMobx.flatConfigs.recommended,
	{
		files: ['**/*.{ts,tsx}'],

		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
			prettier,
		],
		languageOptions: {
			globals: globals.browser,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_$',
					varsIgnorePattern: '^_$',
					ignoreRestSiblings: true,
				},
			],
		},
	},
]);
