/* Author Samiksha Narendra Salgaonkar */
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

const getTravelMemoryPostComments = async (receivedPostId) => {
    try {
        var dynamoDbParams = {
            TableName: "travel_memory_post_comment",
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
            message: "Post Comments Received Successfully",
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

const postTravelMemoryPostComment = async (receivedPostId, body) => {
    try {
        const travelMemoryPostComment = {
            "commentId": { S: uuidv4().toString() },
            "postId": { S: receivedPostId },
            "userId": { S: body.userId },
            "comment": { S: body.comment },
        };
        const dynamoDBParams = { TableName: "travel_memory_post_comment", Item: travelMemoryPostComment };
        await dynamoDb.putItem(dynamoDBParams).promise();
        return {
            message: "Travel Memory Comment Uploaded Successfully",
            success: true,
            payload: travelMemoryPostComment,
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
    getTravelMemoryPostComments,
    postTravelMemoryPostComment
};