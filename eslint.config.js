import pluginVue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    ...pluginVue.configs['flat/recommended'],
    eslintConfigPrettier,
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: ['.vue'],
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
        },
    },
    {
        files: ['resources/js/types/global.d.ts'],
        rules: {
            'no-var': 'off',
        },
    },
    {
        ignores: ['resources/js/components/ui/**/*.{ts,vue}'],
    },
);
