export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  verbose: true,
};
