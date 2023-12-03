import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
};

export default async function config() {
  const nextJestConfig = await createJestConfig(customJestConfig)();

  delete nextJestConfig.moduleNameMapper["^.+\\.(css|sass|scss)$"]; // Next.js 기본 설정 삭제

  return {
    ...nextJestConfig,
    transform: {
      "\\.css\\.ts$": "@vanilla-extract/jest-transform", // Jest transform 설정
      ...nextJestConfig.transform,
    },
  };
}
