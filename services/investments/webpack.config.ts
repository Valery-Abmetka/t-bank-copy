import { BuildMode, BuildPaths, buildWebpack } from '@packages/build-config';
import path from 'path';
import webpack from 'webpack';
import packageJson from './package.json';

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  };
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3002,
    paths,
    analyzer: env.analyzer,
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'investment',
      filename: 'remoteEntry.js',
      exposes: {
        // добавить что экспортируем
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
    })
  );

  return config;
};
