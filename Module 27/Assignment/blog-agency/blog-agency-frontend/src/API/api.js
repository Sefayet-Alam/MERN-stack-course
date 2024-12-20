import axios from 'axios';

if (!process.env.REACT_APP_API_URL) {
  throw new Error("REACT_APP_API_URL environment variable is not set.");
}

// Create an Axios instance with the base URL from the .env file
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Backend URL from .env
});
// Intercept requests to add Authorization headers if the user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Intercept responses to handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error.response || error.message);
  }
);

// Blog APIs
export const fetchBlogs = () => API.get('/blogs');
export const createBlog = (blogData) => API.post('/blogs', blogData);
export const updateBlog = (id, blogData) => API.put(`/blogs/${id}`, blogData);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

// Team APIs
export const fetchTeams = () => API.get('/teams');
export const createTeam = (teamData) => API.post('/teams', teamData);
export const updateTeam = (id, teamData) => API.put(`/teams/${id}`, teamData);
export const deleteTeam = (id) => API.delete(`/teams/${id}`);

// Authentication APIs
export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);
export const fetchCurrentUser = () => API.get('/auth/me');

// Service APIs
export const fetchServices = () => API.get('/services'); // Fetch services
export const createService = (serviceData) => API.post('/services', serviceData);
export const updateService = (id, serviceData) => API.put(`/services/${id}`, serviceData);
export const deleteService = (id) => API.delete(`/services/${id}`);

export default API;
