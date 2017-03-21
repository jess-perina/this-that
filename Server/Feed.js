// DO NOT CHANGE THE NAME OF THIS FILE WITHOUT FIRST CHANGING THE 
// THE START FILE THAT IMPORTS THIS ROUTER--JACQUIN	
'use strict'

const express = require('express');
const router = express.router();

//'/api/feed/'
router.get('/:userId/:mostRecentId/:leastRecentId/', (req,res,next) => {
	Answer.findAll({where: 
		{respondentId: req.params.userId},
		$or : [
		{id: {$gt: req.params.}}] 
	})
});