/* Dhrumil Amish Shah */
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getTravelMemoryPosts = () => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/travelmemorypost`
    });
};

export const postTravelMemoryPost = (travelMemoryPostData) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/travelmemorypost`,
        data: travelMemoryPostData,
        headers: { "Content-Type": "multipart/form-data" },
    });
};