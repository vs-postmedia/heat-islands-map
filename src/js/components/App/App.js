import Map from '../Map/Map';
import './App.css';

// scrollytelling chapters
import data from '../../../data/data';

// map tiles & attribution
const options = {
	activeSection: 'intro',
	bearing: 0,
	center: [-123.0367753913065, 49.25366458504647],
	mapboxStyle: 'https://api.maptiler.com/maps/369f7670-d39c-4dfa-9a78-732b33572503/style.json?key=arETEBBqRxRrA5v30F6H',
	maxZoom: 12,
	minZoom: 9,
	pitch: 15,
	rasterLayer: 'https://api.maptiler.com/tiles/decdc81a-faf6-4e0c-a44d-1e26a90b40	75/{z}/{x}/{y}.jpg?key=arETEBBqRxRrA5v30F6H',
	vectorLayer: 'https://api.maptiler.com/data/eb7f07e2-721c-48be-941f-278d7c665307/features.json?key=arETEBBqRxRrA5v30F6H',
	zoom:  10
};


function init() {
	Map.init(data, options);	
}

export default { init };
