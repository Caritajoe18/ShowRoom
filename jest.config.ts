import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  //A preset is used as base for jest cpnfiguration
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: false,
  collectCoverage: false,
  collectCoverageFrom: [
    "src**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "src**/*.{ts,jsx}",
  ],
  coverageProvider: "babel",
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 80,
      lines: 40,
      statements: 20,
    },
  },
  maxConcurrency: 5,
  testPathIgnorePatterns: ["dist/", "node_modules/"],
  testTimeout: 40000,
};

export default config;
