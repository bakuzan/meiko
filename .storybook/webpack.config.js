const path = require('path');

module.exports = (_, __, config) => {
  const includePath = path.resolve(__dirname, '../lib');

  config.module.rules.push({
    test: /\.tsx?$/,
    include: includePath,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [require.resolve('babel-plugin-styled-components')]
        }
      },
      {
        loader: require.resolve('awesome-typescript-loader')
      },
      {
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  });

  config.module.rules.push({
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
  });

  config.resolve.modules = [includePath, 'node_modules'];
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
