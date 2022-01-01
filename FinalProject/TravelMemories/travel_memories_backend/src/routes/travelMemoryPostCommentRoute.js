/* Author - Samiksha Narendra Salgaonkar */
const express = require('express');
const travelMemoryPostCommentController = require('../controllers/travelMemoryPostCommentController');
const travelMemoryPostCommentRoutes = express.Router();

travelMemoryPostCommentRoutes.get('/:postId', async (req, res, next) => {
    const controllerResponse = await travelMemoryPostCommentController.getTravelMemoryPostComments(req.params.postId);
    return res.status(controllerResponse.statusCode).json(controllerResponse);
});

travelMemoryPostCommentRoutes.post('/:postId', async (req, res, next) => {
    const controllerResponse = await travelMemoryPostCommentController.postTravelMemoryPostComment(req.params.postId, req.body);
    return res.status(controllerResponse.statusCode).json(controllerResponse);
});

module.exports = travelMemoryPostCommentRoutes;