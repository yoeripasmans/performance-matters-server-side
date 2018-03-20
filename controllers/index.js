var router = require('express').Router();
var models = require('../models');

router.get('/', (req, res) => {
	models.getBuildings(req, res);
});

router.get('/buildings/:name', (req, res) => {
	models.getBuildingDetail(req, res, req.params.name);
});

module.exports = router;
