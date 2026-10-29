import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist']
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    parseOptions: {
      project: './tsconfig.json',
      sourceType: 'module'
    },
    plugins: {
      prettier,
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  eslintConfigPrettier
]
