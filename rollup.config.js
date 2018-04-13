import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
import commonjs from 'rollup-plugin-commonjs';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
const pkg = require('./package.json');

const externals = [
  'react',
  'react-dom',
  'prop-types'
]

export default [
  {
    input: 'lib/index.js',
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    external: externals,
    plugins: rollupPlugins()
  },
  {
    input: 'lib/index.js',
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
    resolve({
      module: true,
      main: true,
      browser: true
    }),
    postcss({
      preprocessor: (content, id) => new Promise((resolve, reject) => {
        const result = scss.renderSync({ file: id })
        resolve({ code: result.css.toString() })
      }),
      plugins: [
        autoprefixer
      ],
      modules: true,
      minimize: false,
      namedExports(name) {
        return name.replace(/-/g, '_')
      },
      extract: 'dist/bundle.css',
      extensions: ['.scss']
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ["external-helpers"]
    }),
    commonjs(),
    uglify()
  ]
}
