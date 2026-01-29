// jest.config.js
module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/src/tests"], // <<< evita rodar dist/
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"], // <<< ESSENCIAL
};
