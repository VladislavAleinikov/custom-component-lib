export interface BuildPaths {
  entry: string;
  output: string;
  src: string;
}

export type BuildMode = "production" | "development";

export interface BuildOptions {
  paths: BuildPaths;
  mode: BuildMode;
}
