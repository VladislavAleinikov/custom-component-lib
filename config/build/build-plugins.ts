import FrokTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types";
import path from "path";

export function buildPlugins({
  mode,
  platform,
  paths,
  analyzer,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
  ];

  if (isDev) {
    plugins.push(new FrokTsCheckerWebpackPlugin());
  }

  return plugins;
}
