const path = require('path');

module.exports = ({ config }) => {
  const includeLib = path.resolve(__dirname, '../lib');
  const includeLibStyles = path.resolve(__dirname, '../lib/styles');
  const includeStoryStyles = path.resolve(__dirname, '../stories/styles');

  config.stats = 'verbose';

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
        enforce: 'pre',
        test: /\.js$/,
        include: includeLib,
        exclude: /stories/,
        loader: 'eslint-loader'
      },
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
              ident: 'postcss',
              plugins: () => [require('autoprefixer')()]
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
