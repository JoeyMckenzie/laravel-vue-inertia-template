import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginVue from 'eslint-plugin-vue';
import tsEslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.strict,
    ...tsEslint.configs.stylistic,
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
