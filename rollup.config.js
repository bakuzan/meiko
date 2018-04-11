import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
import commonjs from 'rollup-plugin-commonjs';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';

const cssExportMap = {};
export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  external: [
    'react'
  ],
  plugins: [
    resolve(),
    postcss({
      preprocessor: (content, id) => new Promise((resolve, reject) => {
        const result = scss.renderSync({ file: id })
        resolve({ code: result.css.toString() })
      }),
      plugins: [
        autoprefixer,
        postcssModules({
          getJSON (id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        })
      ],
      modules: true,
      minimize: false,
      getExportNamed: false,
      getExport(id) {
        return cssExportMap[id];
      },
      extract: 'dist/bundle.css',
      extensions: ['.scss']
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
}
