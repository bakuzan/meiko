import '@babel/register';
import dotenv from 'dotenv';

import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import includePaths from 'rollup-plugin-includepaths';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const input = 'lib/index.js';
const externals = [
  'ayaka',
  'classnames',
  'nano-css',
  'prop-types',
  'react',
  'react-dom'
];
const globals = {
  classnames: 'classNames',
  'prop-types': 'PropTypes',
  react: 'React',
  'react-dom': 'ReactDOM'
};
const extensions = ['.js', '.scss'];

function rollupPlugins() {
  return [
    replace({
      ['process.env.NODE_ENV']: JSON.stringify('production')
    }),
    includePaths({
      include: {},
      paths: ['lib'],
      external: [],
      extensions
    }),
    resolve({
      main: true,
      preferBuiltins: false
    }),
    postcss({
      extract: 'dist/bundle.min.css',
      sourceMap: true,
      minimize: isProduction ? { safe: true } : false,
      extensions: ['.scss'],
      use: ['sass'],
      plugins: [autoprefixer]
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      extensions
    }),
    commonjs(),
    isProduction &&
      uglify({
        output: {
          comments: false
        },
        compress: {
          unused: true,
          dead_code: true, // big one--strip code that will never execute
          warnings: false,
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: true,
          sequences: true,
          booleans: true
        }
      })
  ];
}

export default [
  {
    input,
    output: {
      name: 'bundle',
      file: pkg.main,
      format: 'cjs',
      globals,
      sourceMap: isProduction
    },
    external: externals,
    plugins: rollupPlugins()
  }
];
