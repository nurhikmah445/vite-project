import axios from "axios";

const apiFetch = axios.create({
    baseURL: 'http://localhost:3000',
    validateStatus: (status) => status < 500
});

export default apiFetch;
