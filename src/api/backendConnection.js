import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL;

export const getQuestionsRequest = async() => await axios.get(`${url}/getitems`);
export const createQuestionRequest = async (fields) => await axios.post(`${url}/createitem`, fields);
export const editQuestionRequest = async (id, newFields) => await axios.put(`${url}/edititem/${id}`, newFields);
export const deleteQuestionRequest = async (id) => await axios.delete(`${url}/deleteitem/${id}`);