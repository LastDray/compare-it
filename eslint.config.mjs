/*
 * @copyright Copyright (c) 2024, Oleg Chulakov Studio
 * @link https://chulakov.ru
 */

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

const baseConfig = [
	js.configs.recommended,
	importX.flatConfigs.recommended,
	{
		ignores: [
			'node_modules',
			'.turbo',
			'.next',
			'build',
			'coverage',
			'global.d.ts',
			'junit.xml',
			'storybook-static/**',
		],
	},
	{
		files: ['**/*.{js,mjs,ts,tsx}'],
		plugins: {
			'no-relative-import-paths': noRelativeImportPaths,
		},
		rules: {
			'@next/next/no-page-custom-font': 'off',
			'object-curly-spacing': ['error', 'always'],
			'import-x/namespace': 'off',
			'import-x/no-named-as-default-member': 'off',
			'import-x/no-named-as-default': 'off',
			'import-x/no-unresolved': 'off',
			'import-x/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'type',
						'object',
						['sibling', 'parent'],
						'index',
						'unknown',
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'no-relative-import-paths/no-relative-import-paths': [
				'warn',
				{ allowSameFolder: true, prefix: '@' },
			],
		},
	},
];

const compatConfig = compat.config({
	extends: [
		// https://github.com/vercel/next.js/discussions/49337
		'plugin:@next/eslint-plugin-next/core-web-vitals',

		// https://github.com/facebook/react/issues/28313
		'plugin:react-hooks/recommended',
	],
});

export default tseslint.config(
	...baseConfig,
	{
		extends: [
			react.configs.flat['jsx-runtime'],
			...tseslint.configs.recommended,
			importX.flatConfigs.typescript,
			...compatConfig,
		],
		files: ['**/*.{js,md,mdx,mjs,ts,tsx}'],
		rules: {
			'@next/next/no-page-custom-font': 'off',
			'@typescript-eslint/array-type': ['error', { default: 'array' }],
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-require-imports': 'off',
			'@next/next/no-duplicate-head': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: ['**/*.{mdx,tsx}'],
		rules: {
			'@next/next/no-page-custom-font': 'off',
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'react/no-unescaped-entities': 'off',
			'react/function-component-definition': [
				0,
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'no-restricted-syntax': [
				'error',
				{
					selector:
						"ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
					message:
						'Default React import not allowed since we use the TypeScript jsx-transform. If you need a global type that collides with a React named export (such as `MouseEvent`), try using `globalThis.MouseHandler`',
				},
				{
					selector:
						"ImportDeclaration[source.value='react'] :matches(ImportNamespaceSpecifier)",
					message:
						'Named * React import is not allowed. Please import what you need from React with Named Imports',
				},
			],
		},
	},
);
