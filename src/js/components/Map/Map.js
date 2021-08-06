import maplibregl from 'maplibre-gl';

// CSS
import './Map.css';
import './maplibre-gl.css';

let map;


function init(data, options) {
	console.log(data)

	map = new maplibregl.Map({
		container: 'map',
		style: options.mapboxStyle,
		center: options.center,
		zoom: options.zoom,
		bearing: options.bearing,
		pitch: options.pitch	
	});

	addCensusLayer(data, options);

	// On every scroll event, check which element is on screen
	window.onscroll = (map) => {
		const sections = Object.keys(data);

		for (let i = 0, l = sections.length; i < l; i++) {
			const section = sections[i];

			if (isElementOnScreen(section)) {
				setActiveChapter(section, options.activeSection, data);
				break;
			}
		}
	};
}

function addCensusLayer(data, options) {
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
					'#fff5f0',
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
		});

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
		});
	});
}

function setActiveChapter(section, activeSection, data) {
	if (section === activeSection) return;
	 
	map.flyTo(data[section]);
	 
	document.getElementById(section).setAttribute('class', 'active');
	document.getElementById(activeSection).setAttribute('class', '');
	 
	activeSection = section;
}

function isElementOnScreen(id) {
	var element = document.getElementById(id);
	var bounds = element.getBoundingClientRect();

	return bounds.top < (window.innerHeight * 2) && bounds.bottom > 0;
}

export default { init };
