// avoid: rollup Unresolved dependencies
import resolve from 'rollup-plugin-node-resolve';
// avoid: rollup 'default' is not exported by ...
import commonjs from 'rollup-plugin-commonjs';
// import uglify from 'rollup-plugin-uglify-es';
import { uglify } from "rollup-plugin-uglify";
// avoid: process is not defined
import replace from 'rollup-plugin-replace';
// import json from 'rollup-plugin-json';
// import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    sourcemap:true,
    file: 'react-router-concent.js',
    format: 'umd'
  },
  plugins: [
    // json(),
    resolve(),
    // babel({
    //   exclude: 'node_modules/**' // 只编译我们的源代码
    // }),
    commonjs({
      // include: 'node_modules/react',
      include: 'node_modules/**',
      namedExports: {
        // 'react': reactNamedExport,
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // uglify(),
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      }
    }),
  ]
};