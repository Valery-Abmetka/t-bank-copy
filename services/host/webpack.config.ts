import {
  BuildMode,
  BuildPaths,
  buildWebpack,
} from '@packages/build-config';
import path from 'path';
import webpack from 'webpack';
import packageJson from './package.json';

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
  INSURANCE_REMOTE_ENTRY?: string;
  INVESTMENT_REMOTE_ENTRY?: string;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  };
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3000,
    paths,
    analyzer: env.analyzer,
  });
  const INSURANCE_REMOTE_ENTRY =
    env.INSURANCE_REMOTE_ENTRY ?? 'http://localhost:3001';
  const INVESTMENT_REMOTE_ENTRY =
    env.INVESTMENT_REMOTE_ENTRY ?? 'http://localhost:3002';

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        insurance: `insurance@${INSURANCE_REMOTE_ENTRY}/remoteEntry.js`,
        investment: `investment@${INVESTMENT_REMOTE_ENTRY}/remoteEntry.js`,
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
        },
        'react-router-dom': {
          eager: true,
        },
        'react-dom': {
          eager: true,
        },
      },
    }),
  );
  return config;
};
