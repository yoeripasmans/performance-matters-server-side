const toggle = require('./modules/toggle.js');
const filter = require('./modules/filter.js');

(function() {

	const app = {
		init: function() {
			toggle.init();
			filter.getInput();
		},
	};
	//Start app
	app.init();

})();
