import { BuildOptions } from "../types";
import { removeDataTestIdBabelPlugin } from "./remove-data-test-id-babel-plugin";

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === "development";
  const isProd = mode === "production";


  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        targets: "defaults",
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          [
            "@babel/preset-react",
            {
              runtime:  "automatic",
            },
          ],
        ],
      },
    },
  };
}
