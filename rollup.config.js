import dotenv from 'dotenv';
import fs from 'fs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import includePaths from 'rollup-plugin-includepaths';
import autoprefixer from 'autoprefixer'
import postcssModules from 'postcss-modules';
import postcss from 'rollup-plugin-postcss';
import CssModulesSassLoader from './css-modules-loader';
import pkg from './package.json';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const entry = 'lib/index.js';
const externals = [
  'react',
  'react-dom',
  'prop-types'
]

export default [
  {
    input: entry,
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    external: externals,
    plugins: rollupPlugins()
  },
  {
    input: entry,
    output: {
      file: pkg.module,
      format: 'es'
    },
    external: externals,
    plugins: rollupPlugins()
  }
]

function rollupPlugins() {
  return [
    replace({
      ["process.env.NODE_ENV"]: JSON.stringify('production')
    }),
    includePaths({
      include: {},
      paths: ['lib'],
      external: [],
      extensions: ['.js', '.scss']
    }),
    resolve({
      module: true,
      main: true,
      browser: true,
      preferBuiltins: false
    }),
    postcss({
      extensions: ['.scss'],
      plugins: [
        autoprefixer,
        postcssModules({
          Loader: CssModulesSassLoader,
          globalModulePaths: [/styles/],
          generateScopedName: isProduction ? '[hash:base64:5]':'[name]__[local]___[hash:base64:5]',
          getJSON: function(cssFileName, json, outputFileName) {
            const path          = require('path');
            const cssName       = path.basename(cssFileName, '.css');
            const jsonFileName  = path.resolve('./dist/json/' + cssName + '.json');
            fs.writeFileSync(jsonFileName, JSON.stringify(json));
          }
        })
      ],
      extract: 'dist/bundle.min.css',
      minimize: isProduction,
      sourceMap: false,
      modules: true
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ["external-helpers"]
    }),
    commonjs(),
    isProduction && uglify()
  ]
}
