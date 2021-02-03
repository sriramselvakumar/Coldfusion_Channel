import axios from 'axios'

const url = 'http://localhost:8000/v1'

const apiCall = axios.create({
    baseURL: url,
    timeout: 10000,
});

const getVideos = async (maxResults) => {
    const response = await apiCall.get(`/videos/${maxResults}`)
    return response.data.data.items
}

export {getVideos}

