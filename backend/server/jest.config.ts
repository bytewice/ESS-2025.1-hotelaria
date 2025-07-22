import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '\\.steps\\.ts$',  // arquivos que terminam com .steps.ts
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  }
};

export default config;
