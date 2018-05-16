import '@babel/register';
import dotenv from 'dotenv';
import fs from 'fs';
import sass from 'node-sass';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import includePaths from 'rollup-plugin-includepaths';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import CssModulesSassLoader from './css-modules-loader';
import pkg from './package.json';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const entry = 'lib/index.js';
const externals = ['react', 'react-dom', 'prop-types'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes'
};

const sassPreprocessor = (content, id) =>
  new Promise(resolve => {
    const result = sass.renderSync({ file: id });
    resolve({ code: result.css.toString() });
  });

export default [
  {
    input: entry,
    output: {
      file: pkg.module,
      format: 'es'
    },
    external: externals,
    plugins: rollupPlugins()
  },
  {
    input: entry,
    output: {
      name: 'bundle',
      file: pkg.main,
      format: 'iife',
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
      extensions: ['.js', '.scss']
    }),
    resolve({
      module: true,
      main: true,
      browser: true,
      preferBuiltins: false
    }),
    postcss({
      extract: 'dist/bundle.min.css',
      sourceMap: true,
      minimize: isProduction,
      extensions: ['.scss'],
      preprocessor: sassPreprocessor,
      modules: {
        Loader: CssModulesSassLoader,
        globalModulePaths: [/styles/],
        generateScopedName: isProduction
          ? '[hash:base64:5]'
          : '[name]__[local]___[hash:base64:5]',
        getJSON: function(cssFileName, json, outputFileName) {
          const path = require('path');
          const cssName = path.basename(cssFileName, '.css');
          const jsonFileName = path.resolve('./dist/json/' + cssName + '.json');
          console.log(`Writing: ${jsonFileName}`);
          fs.writeFileSync(jsonFileName, JSON.stringify(json));
        }
      },
      plugins: [autoprefixer]
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      plugins: ['external-helpers']
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
