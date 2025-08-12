import webpack from "webpack";
import { buildLoaders } from "./build-loaders";
import { buildPlugins } from "./build-plugins";
import { buildResolvers } from "./build-resolvers";
import { BuildOptions } from "./types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths} = options;
  const isDev = mode === "development";

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "index.js",
      library: "custom-component-lib",
      libraryTarget: "umd",
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    externals: {
      react: "react",
      "react-dom": "react-dom",
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
  };
}
 