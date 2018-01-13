import videojs from 'video.js';
import Highcharts from 'highcharts';
import {version as VERSION} from '../package.json';

// Default options for the plugin.
const defaults = {
  bitrates: null
};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

const buildHighchartsOptions = (bitrates) => ({
  chart: {
    type: 'area',
    height: 30,
    width: null,
    margin: [0, 0, 0, 0],
    backgroundColor: '#333'
  },
  title: {
    text: '',
    margin: 0
  },
  xAxis: {
    labels: { enabled: false },
    title: { enabled: false },
    tickLength: 0,
    minPadding: 0,
    maxPadding: 0
  },
  yAxis: {
    labels: { enabled: false },
    title: { enabled: false },
    gridLineWidth: 0
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false
      }
    }
  },
  series: [
    {
      data: bitrates,
      color: '#ccc',
      enableMouseTracking: false,
      lineWidth: 1,
      animation: false
    }
  ],
  credits: {
    enabled: false
  }
});

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function buildChart
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const buildChart = (player, options) => {
  if (!options.bitrates) {
    return;
  }

  const graphEl = document.createElement('div');
  const markerEl = document.createElement('div');

  graphEl.id = 'vjs-bitrate-graph';
  graphEl.className = 'vjs-bitrate-graph';
  player.el().insertBefore(graphEl, player.el().querySelector('.vjs-control-bar'));

  markerEl.id = 'vjs-bitrate-graph-time-marker';
  markerEl.className = 'vjs-bitrate-graph-time-marker';
  player.el().insertBefore(markerEl, player.el().querySelector('.vjs-control-bar'));

  Highcharts.chart('vjs-bitrate-graph', buildHighchartsOptions(options.bitrates));
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function bitrateGraph
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const bitrateGraph = function(options) {
  this.ready(() => {
    buildChart(this, videojs.mergeOptions(defaults, options));
    this.on('timeupdate', () => {
      const percent = this.currentTime() / this.duration() * 100;
      const el = this.el().querySelector('.vjs-bitrate-graph-time-marker');

      el.style.width = `${percent.toFixed(1)}%`;
    });
  });
};

// Register the plugin with video.js.
registerPlugin('bitrateGraph', bitrateGraph);

// Include the version number.
bitrateGraph.VERSION = VERSION;

export default bitrateGraph;
