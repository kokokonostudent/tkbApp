/** @type {import('ts-jest').JestConfigWithTsJest} */

const { pathsToModuleNameMapper } = require("ts-jest");
const { readFileSync } = require("fs");
const { parse } = require("jsonc-parser");

// tsconfigのpathsを引っ張ってくる
const tsconfig = parse(readFileSync("./tsconfig.json").toString());
const convertedPaths = pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
});

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["<rootDir>/test/**/*.test.[jt]s?(x)"],
    moduleNameMapper: convertedPaths,
};
