const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = ({ config }) => {
  const includeLib = path.resolve(__dirname, '../lib');
  const includeLibStyles = path.resolve(__dirname, '../lib/styles');
  const includeStoryStyles = path.resolve(__dirname, '../stories/styles');

  config.stats = 'verbose';

  config.plugins = [
    ...(config.plugins || []),
    new ESLintPlugin({
      context: includeLib,
      exclude: ['node_modules', 'stories']
    })
  ];

  config.resolve = {
    ...config.resolve,
    extensions: [...config.resolve.extensions, '.scss'],
    alias: {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '..', './lib'),
      'mko-book': path.resolve(__dirname, './withMko')
    }
  };

  config.module.rules.push(
    ...[
      {
        test: /\.scss$/,
        include: [includeLibStyles, includeStoryStyles],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.ttf$|\.woff$|\.woff2$/,
        loader: 'file-loader',
        include: includeStoryStyles
      }
    ]
  );

  return config;
};
