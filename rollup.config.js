import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
// import { uglify } from 'rollup-plugin-uglify'
// 替代 uglify，解决 (plugin uglify) Error: Unexpected token: keyword «const»
import { terser } from 'rollup-plugin-terser'
// import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json'

const env = process.env.NODE_ENV;

// 排除掉react，不作为打包项目
const external = ['react', 'react-router-dom ', 'concent' ].concat(Object.keys(pkg.peerDependencies || {}));

const config = {
  input: 'src/index.js',
  // output.exports must be 'default', 'named', 'none', 'auto', or left unspecified (defaults to 'auto')
  // exports: 'auto', /** Disable warning for default imports */
  external,
  output: {
    exports: 'named',
    format: 'umd',
    name: 'react-router-concent',
    globals: {
      // avoid (!) Missing global variable name
      concent: 'concent',
      react: 'React',
      'react-router-dom ': 'ReactRouterDOM',
    }
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
    }),
    terser(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    commonjs({
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType'],
      }
    }),
    // eslint({
    //   include: ['src/**/*.js'] // 需要检查的部分
    // }),
  ]
}

// if (env === 'production') {
//   config.plugins.push(
//     uglify({
//       compress: {
//         pure_getters: true,
//         unsafe: true,
//         unsafe_comps: true,
//         warnings: false
//       }
//     })
//   )
// }

export default config;
