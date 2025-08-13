import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/build-webpack";

interface EnvVariables {
  mode?: "production" | "development";
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    paths: {
      entry: path.resolve(__dirname, "src", "index.ts"),
      output: path.resolve(__dirname, "build"),
      src: path.resolve(__dirname, "src"),
    },
  });

  return config;
};
