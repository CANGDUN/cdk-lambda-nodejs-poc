module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        process: true,
        it: true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'none',
                semi: true,
                tabWidth: 4,
                endOfLine: 'lf',
                arrowParens: 'avoid'
            }
        ]
    }
};
