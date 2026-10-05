import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // Regras recomendadas de JavaScript
  js.configs.recommended,

  // Regras recomendadas de TypeScript
  ...tseslint.configs.recommended,

  // Desativa regras que conflitam com o Prettier
  prettierConfig,

  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  {
    // Pastas e arquivos ignorados pelo linter
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'eslint.config.mjs'],
  },

  {
    rules: {
      'no-console': 'off', // permitido no backend para logs do servidor
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
);
