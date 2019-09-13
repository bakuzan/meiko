const path = require('path');

module.exports = ({ config }) => {
  const includePath = path.resolve(__dirname, '../lib');
  const includeFontPath = path.resolve(__dirname, '../stories/styles');

  config.resolve = {
    ...config.resolve,
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
        include: includePath,
        exclude: /stories/,
        loader: 'eslint-loader'
      },
      {
        test: /\.scss$/,
        include: includePath,
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
        loader: 'file-loader?limit=10000&mimetype=application/font-woff',
        include: includeFontPath
      }
    ]
  );

  return config;
};
