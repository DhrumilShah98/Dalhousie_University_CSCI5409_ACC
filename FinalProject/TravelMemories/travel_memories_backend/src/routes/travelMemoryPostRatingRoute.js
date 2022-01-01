/* Author Dhrumil Amish Shah */
const express = require('express');
const travelMemoryPostRatingController = require('../controllers/travelMemoryPostRatingController');
const travelMemoryPostRatingRoutes = express.Router();

travelMemoryPostRatingRoutes.get('/:postId', async (req, res, next) => {
    const controllerResponse = await travelMemoryPostRatingController.getTravelMemoryPostRatings(req.params.postId);
    return res.status(controllerResponse.statusCode).json(controllerResponse);
});

travelMemoryPostRatingRoutes.post('/:postId', async (req, res, next) => {
    const controllerResponse = await travelMemoryPostRatingController.postTravelMemoryPostRating(req.params.postId, req.body);
    return res.status(controllerResponse.statusCode).json(controllerResponse);
});

module.exports = travelMemoryPostRatingRoutes;