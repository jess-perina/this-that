// DO NOT CHANGE THE NAME OF THIS FILE WITHOUT FIRST CHANGING THE 
// THE START FILE THAT IMPORTS THIS ROUTER--JACQUIN	
'use strict'

const express = require('express');
const router = express.router();

//'/api/feed/'

//NEED A ROUTE FOR GETTING OLD STUFF
//NEED A ROUTE FOR GETTING NEW STUFF

//Route for getting older stuff(when you scroll all the way to the bottom of the feed)
router.get('/olderItems/:oldestCurrentId', (req, res, next) => {
	const oldId = req.params.oldestCurrentId ? req.params.oldestCurrentId : 
	Answer.findAll({where: {}, limit: 10})
});

router.get('/:userId/:mostRecentId/:leastRecentId/', (req,res,next) => {
	Answer.findAll({where: 
		{respondentId: req.params.userId},
		$or : [
		{id: {$gt: req.params.}}] 
	})
});