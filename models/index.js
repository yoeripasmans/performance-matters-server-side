const fetch = require('node-fetch');
const helpers = require('../helpers');

const models = {
	buildingData: [],
	buildingImages: [],

	getBuildings: function(req, res) {

		if (this.buildingData.length > 0) {
			res.render('index.ejs', {
				building: this.buildingData
			});
		} else {

			fetch(helpers.allBuildingQuery())
				.then(response => response.json())
				.then(data => {
				
					const results = data.results.bindings;
					this.buildingData = results;
					res.render('index.ejs', {
						building: results
					});
				}).catch(error => {
					res.render('partials/error.ejs');
					console.log(error);
				});

		}

	},
	getBuildingDetail: function(req, res, name) {
		//If data already loaded
		if (this.buildingData.length > 0) {
			const dataDetail = this.buildingData.find(d => helpers.getSegment(d.building.value, 3) == req.params.name);
			fetch(helpers.buildingDetailQuery(dataDetail.buildingLabel.value))
				.then(response => response.json())
				.then(data => {
					const results = data.results.bindings;
					this.buildingImages.push(results);
					res.render('detail.ejs', {
						buildingImages: results,
					});
				})
				.catch(error => {
					res.render('partials/error.ejs');
					console.log(error);
				});
		} else {
			//If data not loaded get al buildings
			fetch(helpers.allBuildingQuery())
				.then(response => response.json()) // transform the data into json
				.then(data => {
					const results = data.results.bindings; // get the results
					this.buildingData = results;
					const dataDetail = results.find(d => helpers.getSegment(d.building.value, 3) == req.params.name);

					return fetch(helpers.buildingDetailQuery(dataDetail.buildingLabel.value));
				})
				.then(response => response.json())
				.then(data => {
					const results = data.results.bindings;
					console.log(results.building);
					this.buildingImages.push(results);

					res.render('detail.ejs', {
						buildingImages: results,
					});
				})
				.catch(error => {
					res.render('partials/error.ejs');
					console.log(error);
				});
		}
	}

};

module.exports = models;
