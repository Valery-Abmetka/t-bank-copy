import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';

export function buildPlugins(
  options: BuildOptions,
): Configuration['plugins'] {
  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: path.resolve(
        options.paths.public,
        'avatar.ico',
      ),
      publicPath: '/',
    }),
  ];

  if (isDev) {
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );
  }
  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
}
