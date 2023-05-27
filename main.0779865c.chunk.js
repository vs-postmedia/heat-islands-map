(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 25:
/***/ (function(module, exports) {

module.exports = {
  'intro': {
    bearing: 0,
    center: [-123.0367753913065, 49.25366458504647],
    pitch: 15,
    zoom: 10
  },
  'dtes': {
    center: [-123.09192160912106, 49.27690851481781],
    duration: 1000,
    zoom: 12
  },
  'west-van': {
    center: [-123.1787171904958, 49.24263097785335],
    duration: 1500,
    zoom: 12
  },
  'burnaby': {
    center: [-123.0518051177321, 49.24524171213765],
    duration: 2000,
    zoom: 12
  },
  'whalley': {
    center: [-122.84558636810455, 49.193046709154544],
    duration: 1500,
    zoom: 12
  },
  'surrey': {
    center: [-122.86797343302935, 49.148023064067324],
    duration: 1000,
    zoom: 12
  },
  'langley': {
    center: [-122.6687959713513, 49.11348527451366],
    duration: 1500,
    zoom: 12
  }
};

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(8);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(24);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./src/css/normalize.css
var normalize = __webpack_require__(26);

// EXTERNAL MODULE: ./src/css/colors.css
var colors = __webpack_require__(27);

// EXTERNAL MODULE: ./src/css/fonts.css
var fonts = __webpack_require__(28);

// EXTERNAL MODULE: ./src/css/main.css
var main = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/maplibre-gl/dist/maplibre-gl.js
var maplibre_gl = __webpack_require__(9);
var maplibre_gl_default = /*#__PURE__*/__webpack_require__.n(maplibre_gl);

// EXTERNAL MODULE: ./src/js/components/Map/Map.css
var Map = __webpack_require__(56);

// EXTERNAL MODULE: ./src/js/components/Map/maplibre-gl.css
var Map_maplibre_gl = __webpack_require__(57);

// CONCATENATED MODULE: ./src/js/components/Map/Map.js

 // CSS



var activeSection, map;

function init(data, options) {
  console.log(options);
  map = new maplibre_gl_default.a.Map({
    bearing: options.bearing,
    center: options.center,
    container: 'map',
    maxZoom: options.maxZoom,
    minZoom: options.minZoom,
    pitch: options.pitch,
    style: options.mapboxStyle,
    // style: setRasterLstLayer(options),
    zoom: options.zoom
  });
  map.on('load', function () {
    options.layer = getInputLayer('symbol');
  }); // Add zoom and rotation controls to the map.

  map.addControl(new maplibre_gl_default.a.NavigationControl()); // add choropleth

  addCensusLayer(options); // On every scroll event, check which element is on screen

  window.onscroll = function (map) {
    var sections = Object.keys(data);

    for (var i = 0, l = sections.length; i < l; i++) {
      var section = sections[i];

      if (isElementOnScreen(section)) {
        setActiveChapter(section, options, data);
        break;
      }
    }
  };
}

function addCensusLayer(options) {
  var metric = '_median';
  map.on('load', function () {
    map.addSource('lst', {
      type: 'geojson',
      data: options.vectorLayer
    }); // FILL

    map.addLayer({
      'id': 'fill',
      'type': 'fill',
      'source': 'lst',
      'layout': {},
      'paint': {
        'fill-color': ['step', ['get', metric], 'rgba(255,245,240,0.65)', 308.03, '#fed6c4', 311.42, '#fca487', 313, '#fc7050', 314, '#eb362a', 314.88, '#ba1419', 316.1, '#67000d', 321, '#D1D2D4'],
        'fill-opacity': 0.45
      }
    }, options.layer); // LINES

    map.addLayer({
      'id': 'line',
      'type': 'line',
      'source': 'lst',
      'layout': {},
      'paint': {
        'line-color': 'rgba(255,255,255, 0.25)',
        'line-width': 0.75
      }
    }, options.layer);
  });
}

function changeMapStyle(data, options, style, census) {
  map.setStyle(style); // add census data

  if (census) {
    addCensusLayer(options);
  }
}

function getInputLayer(layerType) {
  var layer;
  var layers = map.getStyle().layers;

  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === layerType) {
      layer = layers[i].id;
      break;
    }
  }

  return layer;
}

function isElementOnScreen(id) {
  var element = document.getElementById(id);
  var bounds = element.getBoundingClientRect();
  return bounds.top < window.innerHeight * 2 && bounds.bottom > 0;
}

function setActiveChapter(section, options, data) {
  var activeSection = options.activeSection;
  if (section === activeSection) return; // if (section === 'step-01') changeMapStyle(data, options, options.mapboxStyle, true);
  // if (section === 'intro') changeMapStyle(data, options, setRasterLstLayer(options), false);

  map.flyTo(data[section]);
  document.getElementById(section).setAttribute('class', 'active');
  document.getElementById(activeSection).setAttribute('class', '');
  options.activeSection = section;
}

function setRasterLstLayer(options) {
  return {
    'version': 8,
    'sources': {
      'raster-tiles': {
        'type': 'raster',
        'tiles': [options.rasterLayer],
        'tileSize': 256,
        'attribution': 'Data from <a target="_top" rel="noopener" 	href="https://www.sentinel-hub.com/">Sentinel Hub</a> and <a 	target="_top" rel="noopener" href="https://www.esa.int/">ESA</a>.'
      }
    },
    'layers': [{
      'id': 'simple-tiles',
      'type': 'raster',
      'source': 'raster-tiles',
      'minzoom': 0,
      'maxzoom': 22
    }]
  };
}

/* harmony default export */ var Map_Map = ({
  init: init
});
// EXTERNAL MODULE: ./src/js/components/App/App.css
var App = __webpack_require__(58);

// EXTERNAL MODULE: ./src/data/data.js
var data_data = __webpack_require__(25);
var data_default = /*#__PURE__*/__webpack_require__.n(data_data);

// CONCATENATED MODULE: ./src/js/components/App/App.js

 // scrollytelling chapters

 // map tiles & attribution

var App_options = {
  activeSection: 'intro',
  bearing: 0,
  center: [-123.0367753913065, 49.25366458504647],
  mapboxStyle: 'https://api.maptiler.com/maps/369f7670-d39c-4dfa-9a78-732b33572503/style.json?key=arETEBBqRxRrA5v30F6H',
  maxZoom: 12,
  minZoom: 9,
  pitch: 15,
  rasterLayer: 'https://api.maptiler.com/tiles/decdc81a-faf6-4e0c-a44d-1e26a90b40	75/{z}/{x}/{y}.jpg?key=arETEBBqRxRrA5v30F6H',
  vectorLayer: 'https://api.maptiler.com/data/eb7f07e2-721c-48be-941f-278d7c665307/features.json?key=arETEBBqRxRrA5v30F6H',
  zoom: 10
};

function App_init() {
  Map_Map.init(data_default.a, App_options);
}

/* harmony default export */ var App_App = ({
  init: App_init
});
// CONCATENATED MODULE: ./src/index.js



// CSS



 // JS



var src_init = /*#__PURE__*/function () {
  var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            App_App.init();

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

src_init();

/***/ })

},[[59,1,2]]]);