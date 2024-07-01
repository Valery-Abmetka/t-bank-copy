import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(
  options: BuildOptions,
): DevServerConfiguration {
  const isDev = options.mode === 'development';
  return {
    hot: isDev,
    port: options.port ?? 3000,
    open: true,
    historyApiFallback: true,
  };
}
