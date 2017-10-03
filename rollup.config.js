import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;

const outputFilename = 'dist/reactCustomCalendar';

const config = {
  input: 'src/index.js',
  external: ['react', 'prop-types'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
  },
  output: {
    file: `${outputFilename}.js`,
    format: 'umd',
  },
  name: 'ReactCustomCalendar',
  plugins: [
    commonjs(),
    nodeResolve({
      jsnext: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};

const uglifyConfig = uglify({
  compress: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    warnings: false,
  },
});

if (env === 'production') {
  config.output.file = `${outputFilename}.min.js`;
  config.plugins.push(uglifyConfig);
}

export default config;
