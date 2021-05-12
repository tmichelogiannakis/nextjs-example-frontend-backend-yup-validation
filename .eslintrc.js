module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': ['off', {}],
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.tsx', '**/*.stories.tsx']
      }
    ],
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        jsx: 'never',
        tsx: 'never'
      }
    ]
  },
  settings: {
    react: { version: 'detect' }
  }
};
