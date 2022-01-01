/* Author - Dhrumil Amish Shah */
const express = require('express');
const travelMemoryPostController = require('../controllers/travelMemoryPostController');
const imageUploadUtil = require('../utils/imageUploadUtil');
const travelMemoryPostRoutes = express.Router();

travelMemoryPostRoutes.get('/', async (req, res, next) => {
    const controllerResponse = await travelMemoryPostController.getTravelMemoryPosts();
    return res.status(controllerResponse.statusCode).json(controllerResponse);
});

travelMemoryPostRoutes.post('/', imageUploadUtil.single('postImage'), async (req, res, next) => {
    const controllerResponse = await travelMemoryPostController.postTravelMemoryPost(req.file, req.body);
    return res.status(controllerResponse.statusCode).json(controllerResponse);
});

module.exports = travelMemoryPostRoutes;