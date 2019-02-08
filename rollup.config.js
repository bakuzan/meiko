import '@babel/register';
import dotenv from 'dotenv';

import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import includePaths from 'rollup-plugin-includepaths';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import ts from 'rollup-plugin-typescript';
import typescript from 'typescript';

import pkg from './package.json';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const entry = 'lib/index.ts';
const externals = ['react', 'react-dom', 'prop-types', 'styled-components'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'styled-components': 'styled'
};
const extensions = ['.js', '.ts', '.tsx', '.scss'];

export default [
  {
    input: entry,
    output: {
      name: 'bundle',
      file: pkg.main,
      format: 'cjs',
      globals: globals,
      sourceMap: isProduction
    },
    external: externals,
    plugins: rollupPlugins()
  }
];

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
    ts({
      typescript
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
