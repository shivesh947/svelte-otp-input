import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'

export default {
  input: './src/lib/index.ts',
  output: {
    file: './dist/index.d.ts',
    format: 'iife'
  },
  plugins: [
    svelte(),
    commonjs(),
    nodeResolve(),
    postcss({
      plugins: []
    }),
    // see NOTICE below
    resolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte']
    }),
    // ...
  ]
}