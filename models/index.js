const fetch = require("node-fetch");
const helpers = require('../helpers');

const models = {

	getBuildings: function(req, res) {
		const buildings = [];

		if (buildings.length > 0) {
			res.render('index.ejs', {
				building: buildings
			});
		} else {
			fetch(helpers.allBuildingQuery())
				.then(response => response.json())
				.then(data => {
					const results = data.results.bindings;
					res.render('index.ejs', {
						building: results
					});
				}).catch(error => {
					console.log(error);
				});

		}

	},
	getBuildingDetail: function(req, res, name) {

		fetch(helpers.allBuildingQuery())
			.then(response => response.json()) // transform the data into json
			.then(data => {
				const results = data.results.bindings; // get the results
				// console.log(req.params.name);
				const dataDetail = results.find(d => helpers.getSegment(d.building.value, 3) == req.params.name);

				return fetch(helpers.buildingDetailQuery(dataDetail.buildingLabel.value));
			})
			.then(response => response.json())
			.then(data => {
				const results = data.results.bindings;
				res.render('detail.ejs', {
					buildingDetail: results
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

};

module.exports = models;
