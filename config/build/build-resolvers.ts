import { Configuration } from "webpack";
import { BuildOptions } from "./types";

export function buildResolvers(options: BuildOptions): Configuration["resolve"] {
  return {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  };
}