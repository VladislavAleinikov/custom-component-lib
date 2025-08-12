import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/build-webpack";

interface EnvVariables {
  mode?: "production" | "development";
  port?: number;
  analyzer?: boolean;
  platform?: "mobile" | "desctop";
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    platform: env.platform ?? "desctop",
    paths: {
      entry: path.resolve(__dirname, "src", "index.ts"),
      output: path.resolve(__dirname, "build"),
      html: path.resolve(__dirname, "public", "index.html"),
      src: path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
    },
    analyzer: env.analyzer,
  });

  return config;
};
