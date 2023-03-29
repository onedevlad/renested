import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  verbose: true,
  moduleNameMapper: {
    "^config/(.*)$": "<rootDir>/config/$1",
    "^exceptions/(.*)$": "<rootDir>/exceptions/$1",
    "^modules/(.*)$": "<rootDir>/modules/$1",
    "^services/(.*)$": "<rootDir>/services/$1",
    "^utils/(.*)$": "<rootDir>/utils/$1",
    "^web/(.*)$": "<rootDir>/web/$1",
  },
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default jestConfig
