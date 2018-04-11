import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  // All the used libs needs to be here
  external: [
    'react'
  ],
  plugins: [
    resolve(),
    scss({
      output: true
    }),
    postcss({
      modules: true,
      minimize: false,
      extract: 'dist/styles.css',
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
}
