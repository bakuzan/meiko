import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
import commonjs from 'rollup-plugin-commonjs';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'lib/index.js',
  output: {
    name: "meiko",
    file: 'dist/bundle.min.js',
    format: 'iife',
    globals: ['React', 'PropTypes']
  },
  external: [
    'react',
    'prop-types'
  ],
  plugins: [
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
      exclude: 'node_modules/**'
    }),
    commonjs(),
    uglify()
  ]
}
