const path = require('path');

const SRC_PATH = path.join(__dirname, '../lib');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]]
    }
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
// module.exports = {
//   resolve: {
//     modules: [SRC_PATH, 'node_modules']
//   },
//   module: {
//     rules: [
//       {
//         enforce: 'pre',
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'eslint-loader'
//       },
//       {
//         test: /\.ts|tsx$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         options: {
//           presets: [['react-app', { flow: false, typescript: true }]]
//         }
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           {
//             loader: 'style-loader'
//           },
//           {
//             loader: 'css-loader'
//           },
//           {
//             loader: 'postcss-loader',
//             options: {
//               ident: 'postcss',
//               plugins: () => [require('autoprefixer')()]
//             }
//           },
//           {
//             loader: 'sass-loader'
//           }
//         ],
//         include: path.resolve(__dirname, '../lib')
//       }
//     ]
//   }
// };
