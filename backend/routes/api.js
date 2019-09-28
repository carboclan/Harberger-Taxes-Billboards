var express = require('express');
var router = express.Router();
var adboarddataapi = require('../api/adboarddataapi');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

router.post('/v1/addAdboardHistory', adboarddataapi.addAdBoardHistory);
router.get('/v1/getAdBoardHistory', adboarddataapi.getAdBoardHistory);

//router.get('/v1/getAllAdBoardData', adboarddataapi.getAllAdBoardData);
//router.get('/v1/getRandomAdBoardData', adboarddataapi.getRandomAdBoardData);
//router.post('/v1/createOrUpdateAdBoardData', adboarddataapi.createOrUpdateAdBoardData);

module.exports = router;
