var routes = require('express').Router();
var fetch = require("node-fetch");
var models = require('../models');
var helpers = require('../helpers');

routes.get('/', (req, res) => {

	var buildings = [];

	if (buildings.length > 0) {
		res.render('index.ejs', {
			building: buildings
		});
	} else {
		fetch(helpers.allBuildingQuery())
			.then(response => response.json())
			.then(data => {
				var results = data.results.bindings;
				res.render('index.ejs', {
					building: results
				});
			}).catch(error => {
				console.log(error);
			});

	}

});

routes.get('/buildings/:name', (req, res) => {

	fetch(helpers.allBuildingQuery())
		.then(response => response.json()) // transform the data into json
		.then(data => {
			var results = data.results.bindings; // get the results
			// console.log(req.params.name);
			var dataDetail = results.find(d => helpers.getSegment(d.building.value, 3) == req.params.name);

			return fetch(helpers.buildingDetailQuery(dataDetail.buildingLabel.value));
		})
		.then(response => response.json())
		.then(data => {
			var results = data.results; // get the results

			res.render('detail.ejs', {
				building: results
			});
		})
		.catch(error => {
			console.log(error);
		});

});

module.exports = routes;
