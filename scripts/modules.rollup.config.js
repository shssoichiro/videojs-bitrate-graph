/**
 * Rollup configuration for packaging the plugin in a module that is consumable
 * by either CommonJS (e.g. Node or Browserify) or ECMAScript (e.g. Rollup).
 *
 * These modules DO NOT include their dependencies as we expect those to be
 * handled by the module system.
 */
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  input: 'src/plugin.js',
  output: [{
    file: 'dist/videojs-bitrate-graph.cjs.js',
    format: 'cjs',
    globals: {
      'video.js': 'videojs'
    },
    name: 'videojsBitrateGraph'
  }, {
    file: 'dist/videojs-bitrate-graph.es.js',
    format: 'es',
    globals: {
      'video.js': 'videojs'
    },
    name: 'videojsBitrateGraph'
  }],
  external: [
    'global',
    'global/document',
    'global/window',
    'highcharts',
    'video.js'
  ],
  plugins: [
    json(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['es2015', {
          loose: true,
          modules: false
        }]
      ],
      plugins: [
        'external-helpers',
        'transform-object-assign'
      ]
    })
  ]
};
