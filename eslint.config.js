// eslint.config.js
import js from '@eslint/js';
import eslintPluginReact from 'eslint-plugin-react';
import eslintConfigAirbnbBase from 'eslint-config-airbnb-base';
import eslintPluginImport from 'eslint-plugin-import';

export default [
  js.configs.recommended, // eslint:recommended

  eslintPluginReact.configs.recommended, // plugin:react/recommended

  eslintConfigAirbnbBase, // airbnb-base
  {
    files: ['**/*.js', '**/*.jsx'], // Apply to JavaScript and JSX files
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
      // Your custom rules here
      'no-console': 'warn', // Warn about console.log statements
      'react/prop-types': 'off' // Disable prop-types validation
    }
  }
];
