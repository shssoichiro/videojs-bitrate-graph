# videojs-bitrate-graph

Shows a bitrate graph above the video controls

## Installation

```sh
npm install --save videojs-bitrate-graph
```

## Usage

To include videojs-bitrate-graph on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-bitrate-graph.min.js"></script>
<script>
  var player = videojs('my-video');

  player.bitrateGraph({ bitrates: [4, 8, 3] });
</script>
```

Ensure your videojs container has a width set. If you let the width be determined automatically,
there may be bugs with the graph not being sized correctly.

### Browserify/CommonJS

When using with Browserify, install videojs-bitrate-graph via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-bitrate-graph');

var player = videojs('my-video');

player.bitrateGraph();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-bitrate-graph'], function(videojs) {
  var player = videojs('my-video');

  player.bitrateGraph();
});
```

## License

MIT. Copyright (c) Josh Holmer &lt;jholmer.in@gmail.com&gt;


[videojs]: http://videojs.com/
