var config = require('../config')

getAdBoardHistory = (req, res, next) => {
	config.adBoardHistory.findAll({
		where: {
			ad_id: req.query.ad_id
		}
	  })
	  .then(data => {
		return res.send({"resp":data});
	});
}

addAdBoardHistory = (req, res, next) => {
	config.adBoardHistory.create({
		ad_id: req.body.ad_id,
		parent_id: req.body.parent_id,
		owner_address: req.body.owner_address,
		price: req.body.price,
		deposit: req.body.deposit,
		last_tax_pay_timestamp: req.body.last_tax_pay_timestamp,
		content: req.body.content
	}).then(data => {
		return res.send({"resp":data});
	});
}

// getAllAdBoardData = (req, res, next) => {
// 	config.adBoardData.findAll()
// 	  .then(data => {
// 		return res.send({"resp":data});
// 	});
// }

// getRandomAdBoardData = (req, res, next) => {
// 	config.adBoardData.count({
// 		col: 'ad_id'
// 	}).then(data => {
// 		var random = Math.floor((Math.random() * data))
// 		config.adBoardData.findOne({
// 			where: {
// 				ad_id: random //Math.floor((Math.random() * data))
// 			}
// 		  })
// 		  .then(data => {
// 			return res.send({"resp":data});
// 		});
// 	});
// }

// createOrUpdateAdBoardData = (req, res, next) => {

// 	config.adBoardData.upsert({
// 		ad_id: req.body.ad_id,
// 		parent_id: req.body.parent_id,
// 		owner_address: req.body.owner_address,
// 		price: req.body.price,
// 		deposit: req.body.deposit,
// 		last_tax_pay_timestamp: req.body.last_tax_pay_timestamp,
// 		content: req.body.content
// 	}, {
// 		where: {
// 			ad_id: req.body.ad_id
// 		}
// 	  })
// 	  .then(data => {
// 		return res.send({"resp":data});
// 	});
// }

module.exports = {
	getAdBoardHistory,
	addAdBoardHistory,
	// getAllAdBoardData,
	// getRandomAdBoardData,
	// createOrUpdateAdBoardData,
}