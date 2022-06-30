/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    silent: false,
    verbose: true,
    roots: [
        "<rootDir>/source"
    ],
    maxWorkers: "50%", // As recommended in jest.io https://jestjs.io/docs/configuration#maxworkers-number--string
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/"
    ],
    testMatch: [
        "**/*.spec.ts"
    ],
    moduleFileExtensions: ["ts", "js", "node", "json"],
    preset: "ts-jest",
    reporters: [
        "default",
        // [ "jest-junit", { suiteName: "jsagent", outputDirectory: "test-results/junit/" } ]
    ],
    globals: {
        "ts-jest": {
            tsconfig: "./tsconfig.spec.json",
            diagnostics: false,
            isolatedModules: true
        },
        // These two get monkey patched by jsdom to its own values,
        // but this is needed to not break tests that run in node env
        self: {},
        navigator: {},
        // We are running tests with jest-circus so jasmine does not exist anymore in global scope.
        // We need to stub the global to trick jasmine-ajax library that we are still using it,
        // so ajax can be installed to this object.
        jasmine: {},
        __UNIT__: true
    },
    coverageDirectory: "test-results",
    // in ci npm test runs this with --coverage, so leave this off here to not slow down tests when executing locally
    collectCoverage: false,
    collectCoverageFrom: [
        "./source/**/*.ts"
    ],
    coveragePathIgnorePatterns: [
        "/\\.spec\\.ts$/i",
        "/.*node_modules.*/",
        "/.*testtools.*/",
        "/.*npm-scripts.*/"
    ],
    coverageReporters: [
        "lcov", "cobertura"
    ],
    coverageProvider: "v8",
    resetMocks: true,
    restoreMocks: true,
    resetModules: true,
    setupFilesAfterEnv: [
        "jest-extended/all",
        //"<rootDir>/source/testtools/setup.spec.ts"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/source/testtools/"
    ],
    testEnvironmentOptions: {
        url: "http://localhost:3000/context.html"
    },
    // moduleNameMapper: {
    //     "^@test-helpers": "<rootDir>/source/testtools/index.spec.ts",
    // }
};

module.exports = config;
