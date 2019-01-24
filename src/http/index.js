import axios from 'axios';

const resource = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default resource;
