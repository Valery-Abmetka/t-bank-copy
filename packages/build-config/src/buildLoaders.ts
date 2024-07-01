import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { buildBabelLoader } from './babel/buildBabelLoader';

export function buildLoaders(
  options: BuildOptions,
): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModule = {
    loader: 'css-loader',
    options: {
      modules: {
        namedExport: false,
        exportLocalsConvention: 'as-is',
        localIdentName: isDev
          ? '[path][name]__[local]'
          : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModule,
      'sass-loader',
    ],
  };
  const babelLoader = buildBabelLoader(options);

  return [svgLoader, assetLoader, scssLoader, babelLoader];
}
