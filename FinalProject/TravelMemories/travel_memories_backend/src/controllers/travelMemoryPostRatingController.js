/* Author Dhrumil Amish Shah */
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const AWS_CONFIG = {
    "region": process.env.AWS_REGION,
    "accessKeyId": process.env.AWS_ACCESS_KEY,
    "secretAccessKey": process.env.AWS_SECRET_KEY,
    "sessionToken": process.env.AWS_SESSION_TOKEN,
};

AWS.config.update(AWS_CONFIG);

const dynamoDb = new AWS.DynamoDB({
    "region": process.env.AWS_REGION,
    "accessKeyId": process.env.AWS_ACCESS_KEY,
    "secretAccessKey": process.env.AWS_SECRET_KEY,
    "sessionToken": process.env.AWS_SESSION_TOKEN,
    "endpoint": process.env.AWS_DYNAMODB_ENDPOINT
});

const getTravelMemoryPostRatings = async (receivedPostId) => {
    try {
        var dynamoDbParams = {
            TableName: "travel_memory_post_rating",
            FilterExpression: '#postId = :postIdValue',
            ExpressionAttributeNames: {
                "#postId": "postId"
            },
            ExpressionAttributeValues: {
                ":postIdValue": { "S": receivedPostId }
            }
        };
        const dynamoDBData = await dynamoDb.scan(dynamoDbParams).promise();
        return {
            message: "Post Ratings Received Successfully",
            success: true,
            payload: dynamoDBData,
            statusCode: 200,
        };
    } catch (error) {
        console.log(error);
        return {
            message: "Internal Server Error",
            success: false,
            payload: undefined,
            statusCode: 500,
        };
    }
};

const postTravelMemoryPostRating = async (receivedPostId, body) => {
    try {
        const travelMemoryPostRating = {
            "ratingId": { S: uuidv4().toString() },
            "postId": { S: receivedPostId },
            "userId": { S: body.userId },
            "rating": { S: body.rating },
        };
        const dynamoDBParams = { TableName: "travel_memory_post_rating", Item: travelMemoryPostRating };
        await dynamoDb.putItem(dynamoDBParams).promise();
        return {
            message: "Travel Memory Rating Uploaded Successfully",
            success: true,
            payload: travelMemoryPostRating,
            statusCode: 200,
        };
    } catch (error) {
        console.log(error);
        return {
            message: "Internal Server Error",
            success: false,
            payload: undefined,
            statusCode: 500,
        };
    }
};

module.exports = {
    getTravelMemoryPostRatings,
    postTravelMemoryPostRating
};