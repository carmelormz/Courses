import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    rules: {
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  { languageOptions: { globals: globals.browser } },
];
