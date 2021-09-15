/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const config = {
	verbose: true,
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.ts"],
	coveragePathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/.next/",
		"<rootDir>/.husky/",
		"<rootDir>/coverage/",
		"jest.config.ts",
		"next-env.d.ts",
		"next.config.js",
	],
	coverageDirectory: "coverage",
	transform: {
		"^.+\\.[jt]sx?$": "babel-jest",
	},
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleDirectories: ["node_modules", "<rootDir>"],
	testEnvironment: "jsdom",
};

export default config;
