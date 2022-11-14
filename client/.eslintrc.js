module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.json', 'cypress/tsconfig.json'],
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
        'no-console': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        'react/display-name': 'off',
    },
    ignorePatterns: ['.eslintrc.js', '**/*spec.ts', 'dist', 'node_modules'],
};