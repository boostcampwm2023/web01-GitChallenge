import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
};

export default async function config() {
  const styleFileRegex = "^.+\\.(css|sass|scss)$";
  const nextJestConfig = await createJestConfig(customJestConfig)();

  const defaultMapper = nextJestConfig.moduleNameMapper[styleFileRegex]; // Next.js 기본 설정 삭제
  delete nextJestConfig.moduleNameMapper[styleFileRegex];

  return {
    ...nextJestConfig,
    moduleNameMapper: {
      "design-system/styles/.+\\.css$": defaultMapper,
      ...nextJestConfig.moduleNameMapper,
    },
    transform: {
      "\\.css\\.ts$": "@vanilla-extract/jest-transform", // Jest transform 설정
      ...nextJestConfig.transform,
    },
  };
}
