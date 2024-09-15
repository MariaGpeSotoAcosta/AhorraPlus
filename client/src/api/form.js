import axios from './axios'

export const saveFormRequest = (formData) => axios.post('/form', formData);
export const updateFormRequest = (formData) => axios.put('/form', formData);
export const getFormRequest = () => axios.get('/form');
