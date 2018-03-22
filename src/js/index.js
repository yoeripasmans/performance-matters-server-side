const toggle = require('./modules/toggle.js');
const map = require('./modules/map.js');
const filter = require('./modules/filter.js');

(function() {

	const app = {
		init: function() {
			toggle.init();
			// map.init();
		},
	};
	//Start app
	app.init();

})();
