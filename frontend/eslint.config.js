import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores(['dist']),
	pluginMobx.flatConfigs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		plugins: { mobx: pluginMobx },
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
			'mobx/exhaustive-make-observable': 'warn',
			'mobx/unconditional-make-observable': 'error',
			'mobx/missing-make-observable': 'error',
			'mobx/missing-observer': 'warn',
		},
	},
]);
