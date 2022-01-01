/* Samiksha */
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getTravelMemoryPostsComments = (postId) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/travelmemorypost/comment/${postId}`
    });
};

export const postTravelMemoryPostComments = (travelMemoryComment, postId) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/travelmemorypost/comment/${postId}`,
        data: travelMemoryComment,
        headers: { "Content-Type": "application/json" },
    });
};