//@ts-check

"use strict";

const path = require("path");

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const mainConfig = {
    name: "main",
    target: "node", // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
    mode: "development", // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
    entry: {
        main: "./src/main.ts",
    }, // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: {
        // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "commonjs2",
    },
    externals: {
        vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
        // modules added here also need to be added in the .vscodeignore file
    },
    resolve: {
        alias: {
            //"@CommonTypes": path.resolve(__dirname, "./src/common/types"),
            //"@CommonUtils": path.resolve(__dirname, "./src/common/utils"),
            //"@Extension": path.resolve(__dirname, "./src/extension"),
            //"@ExtensionTypes": path.resolve(__dirname, "./src/extension/types"),
            //"@ExtensionUtils": path.resolve(__dirname, "./src/extension/utils"),
            //"@Parser": path.resolve(__dirname, "./src/extension/parser"),
        },
        // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
        extensions: [".js", ".ts", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules | test)/,
                use: [
                    {
                        loader: "ts-loader",
                    },
                ],
            },
        ],
    },
    devtool: "nosources-source-map",
    infrastructureLogging: {
        level: "log", // enables logging required for problem matchers
    },
    watchOptions: {
        poll: 5000,
    },
};

/** @type WebpackConfig */
/*
const appConfig = {
    name: "app",
    target: "web",
    mode: "development",
    entry: {
        app: "./src-app/App.tsx",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    resolve: {
        alias: {
            //"@AppComponents": path.resolve(__dirname, "./src/app/components"),
            //"@AppHooks": path.resolve(__dirname, "./src/app/hooks"),
            //"@AppObjects": path.resolve(__dirname, "./src/app/objects"),
            //"@AppTypes": path.resolve(__dirname, "./src/app/types"),
            //"@AppUtils": path.resolve(__dirname, "./src/app/utils"),
            //"@CommonTypes": path.resolve(__dirname, "./src/common/types"),
            //"@CommonUtils": path.resolve(__dirname, "./src/common/utils"),
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                    },
                ],
            },
        ],
    },
    devtool: "nosources-source-map",
    infrastructureLogging: {
        level: "log", // enables logging required for problem matchers
    },
    watchOptions: {
        poll: 5000,
    },
};
*/

module.exports = [mainConfig, /*appConfig*/];
