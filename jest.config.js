module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/src/tests"],
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.enum.ts",
        "!src/index.ts",
        "!src/tests/**"
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        "\\.enum\\.ts$"
    ]
};
