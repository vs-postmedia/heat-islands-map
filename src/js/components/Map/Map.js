import maplibregl from 'maplibre-gl';

// CSS
import './Map.css';
import './maplibre-gl.css';

let activeSection, map;


function init(data, options) {
	console.log(options)

	map = new maplibregl.Map({
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

	map.on('load', () => {
		options.layer = getInputLayer('symbol');
	});

	// Add zoom and rotation controls to the map.
	map.addControl(new maplibregl.NavigationControl());

	// add choropleth
	addCensusLayer(options);

	// On every scroll event, check which element is on screen
	window.onscroll = (map) => {
		const sections = Object.keys(data);

		for (let i = 0, l = sections.length; i < l; i++) {
			const section = sections[i];

			if (isElementOnScreen(section)) {
				setActiveChapter(section, options, data);
				break;
			}
		}
	};
}

function addCensusLayer(options) {
	const metric = '_median';

	map.on('load', () => {
		map.addSource('lst', {
			type: 'geojson',
			data: options.vectorLayer
		});

		// FILL
		map.addLayer({
			'id': 'fill',
			'type': 'fill',
			'source': 'lst',
			'layout': {},
			'paint': {
			'fill-color': [
					'step',
					['get', metric],
					'rgba(255,245,240,0.65)',
					308.03,
					'#fed6c4',
					311.42,
					'#fca487',
					313,
					'#fc7050',
					314,
					'#eb362a',
					314.88,
					'#ba1419',
					316.1,
					'#67000d',
					321,
					'#D1D2D4'
				],
				'fill-opacity': 0.45
			}
		}, options.layer);

		// LINES
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
	map.setStyle(style);

	// add census data
	if (census) {
		addCensusLayer(options);
	}
}

function getInputLayer(layerType) {
	let layer;
	const layers = map.getStyle().layers;
	
	for (let i = 0; i < layers.length; i++) {
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

	return bounds.top < (window.innerHeight * 2) && bounds.bottom > 0;
}

function setActiveChapter(section, options, data) {
	const activeSection = options.activeSection;

	if (section === activeSection) return;
	// if (section === 'step-01') changeMapStyle(data, options, options.mapboxStyle, true);
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
					'attribution':
					'Data from <a target="_top" rel="noopener" 	href="https://www.sentinel-hub.com/">Sentinel Hub</a> and <a 	target="_top" rel="noopener" href="https://www.esa.int/">ESA</a>.'
				}
			},
			'layers': [
				{
					'id': 'simple-tiles',
					'type': 'raster',
					'source': 'raster-tiles',
					'minzoom': 0,
					'maxzoom': 22
				}
			]
		}
}


export default { init };
