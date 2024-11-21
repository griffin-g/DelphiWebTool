import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});


export const getAllQuestions = () => api.get('/questions');
export const getQuestionById = (id) => api.get(`/questions/${id}`);
export const createQuestion = (data) => api.post('/questions', data);
export const updateQuestion = (id, data) => api.put(`/questions/${id}`, data);
export const deleteQuestion = (id) => api.delete(`/questions/${id}`);

export default api;
