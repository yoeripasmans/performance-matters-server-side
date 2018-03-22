import api from './api.js';
import sections from './sections.js';
import tabs from './tabs.js';
import routie from './vendor/routie.js';

const router = {
	//Set the router
	init: function() {

		routie({
			'': () => {
				routie('home');
			},
			'home': () => {
				sections.toggle('map');
				tabs.active();
			},
			'buildings/:name': (name) => {
				api.getBuildingDetail(name);
				tabs.disabled();
			},
		});
	},

};

export default router;
