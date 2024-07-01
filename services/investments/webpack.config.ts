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
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(
      __dirname,
      'src',
      'app',
      'index.tsx',
    ),
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
          requiredVersion: false,
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: false,
        },
        'react-dom': {
          eager: true,
          requiredVersion: false,
        },
        '@reduxjs/toolkit': {
          eager: true,
          requiredVersion: false,
        },
        'react-redux': {
          eager: true,
          requiredVersion: false,
        },
        '@packages/shared': {
          eager: true,
          requiredVersion: false,
        },
        '@mui/material': {
          singleton: true,
          requiredVersion: '^5.15.20',
          eager: true,
        },
        '@emotion/styled': {
          singleton: true,
          eager: true,
          requiredVersion: '^11.11.5',
        },
        '@emotion/react': {
          singleton: true,
          eager: true,
          requiredVersion: '^11.11.4',
        },
      },
    }),
  );

  return config;
};
