import axios from 'axios';

const API = axios.create({ baseURL: "https://velocity-ai-assignment.onrender.com/api" });


export const register = (email, password, username) => API.post('/auth/register', { email, password, username });
export const login = (email, password) => API.post('/auth/login', { email, password });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${(localStorage.getItem('token')).toString()}`;
    }
    return req;
});

export const getProfile = () => API.get('/auth/profile');
export const fetchPolls = () => API.get('/polls');
export const createPoll = (pollData) => API.post('/polls', pollData);
export const votePoll = (pollId, voteData) => API.post(`/polls/${pollId}/vote`, voteData);
export const addComment = (pollId, commentData) => API.post(`/comments/${pollId}/comment`, commentData);
export const fetchUserProfile = () => API.get('/users/profile');
export const fetchPollResults = (pollId) => API.get(`/polls/${pollId}/results`);
export const fetchPollComments = (pollId) => API.get(`/comments/${pollId}/comments`);
export const uploadProfile = (formData) => API.post('/auth/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
