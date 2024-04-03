import axios from './axios.js';

export const getTasksRequest = () => axios.get('/tasks');
export const getTaskByIDRequest = async (id) => axios.get(`/tasks/${id}`);

export const createTaskRequest = async (task) => axios.post('/tasks', task);

export const updateTaskRequest = async (task) =>
	axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/'${id}`);

export const createTaskListRequest = async (list) => axios.post('/lists', list);

export const getTaskListRequest = () => axios.get('/lists');

export const updateListRequest = (list) =>
	axios.put(`/lists/${list._id}`, list);

export const deleteListRequest = async (id) => axios.delete(`/lists/${id}`);
