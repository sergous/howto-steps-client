module.exports = function (wallaby) {
    return {
        files: ['src/**/*.ts?(x)', '!src/**/*.test.ts?(x)'],
        tests: ['src/**/*.test.ts?(x)'],

        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',

        debug: true,
        compilers: {
            '**/*.ts?(x)': wallaby.compilers.typeScript({
                module: 'commonjs',
                jsx: 'React',
            }),
        },

        trace: true,
    };
};
