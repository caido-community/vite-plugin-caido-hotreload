import fs from "fs";
import path from "path";

import { defineBackendPluginManifest } from "../manifest";
import { type BackendBuildOutput } from "../types";

/**
 * Bundles the backend plugin
 * @param pluginPackageDir - The directory to bundle the plugin into.
 * @param buildOutput - The build output.
 */
export function bundleBackendPlugin(
  pluginPackageDir: string,
  buildOutput: BackendBuildOutput,
) {
  // Create plugin directory
  const pluginDir = path.join(pluginPackageDir, buildOutput.id);
  fs.mkdirSync(pluginDir, { recursive: true });

  // Copy JS file
  const jsDestPath = path.join(pluginDir, path.basename(buildOutput.fileName));
  fs.copyFileSync(buildOutput.fileName, jsDestPath);
  const jsRelativePath = path.relative(pluginPackageDir, jsDestPath);

  return defineBackendPluginManifest({
    id: buildOutput.id,
    kind: "backend",
    name: buildOutput.name ?? buildOutput.id,
    entrypoint: jsRelativePath,
    runtime: "javascript",
  });
}
