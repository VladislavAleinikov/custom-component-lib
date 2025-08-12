import { Configuration } from "webpack";
import { BuildOptions } from "./types";

export function buildResolvers({paths}: BuildOptions): Configuration["resolve"] {
  return {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": paths.src,
    },
  };
}