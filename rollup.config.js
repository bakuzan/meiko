import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import sassModules from 'rollup-plugin-sass-modules';
import commonjs from 'rollup-plugin-commonjs';
import autoprefixer from 'autoprefixer'
import postcss from 'postcss';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import includePaths from 'rollup-plugin-includepaths';
import pkg from './package.json';

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
    sassModules({
      include: ['lib/**/*.scss'],
      options: {
        output: 'dist/bundle.css',
        minimize: false,
        sourceMaps: false,
      },
      processor: css => postcss([autoprefixer])
      .process(css, { from: undefined })
      .then(result => result.css)
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ["external-helpers"]
    }),
    commonjs()
  ]
}

/*
            postcssModules({
              Loader: CssModulesSassLoader, // Load all "composes" files with Sass
              generateScopedName: '[name]__[local]___[hash:base64:5]',//'[hash:base64:5]',
              getJSON: function(cssFileName, json, outputFileName) {
                const path          = require('path');
                const cssName       = path.basename(cssFileName, '.css');
                const jsonFileName  = path.resolve('./dist/json/' + cssName + '.json');
                fs.writeFileSync(jsonFileName, JSON.stringify(json));
              },
            })
 */