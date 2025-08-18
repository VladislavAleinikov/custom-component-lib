import FrokTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types";

export function buildPlugins({
  mode,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";

  const plugins: Configuration["plugins"] = [];

  if (isDev) {
    plugins.push(new FrokTsCheckerWebpackPlugin());
  }

  return plugins;
}
