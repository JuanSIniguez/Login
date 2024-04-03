import { createContext, useState, useContext, useEffect } from 'react';
import {
	getTaskByIDRequest,
	getTasksRequest,
	createTaskRequest,
	updateTaskRequest,
	deleteTaskRequest,
	createTaskListRequest,
	getTaskListRequest,
} from '../api/task';

export const TaskContext = createContext();

export const useTasks = () => {
	const context = useContext(TaskContext);
	if (!context) throw new Error('useTasks must be used within a TaskProvider');
	return context;
}; //Para que funciona?

export function TaskProvider({ children }) {
	const [tasks, setTasks] = useState([]);
	const [lists, setLists] = useState([]);

	const getTasks = async () => {
		try {
			const res = await getTasksRequest();
			setTasks(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const createTask = async (task) => {
		try {
			const res = await createTaskRequest(task);
		} catch (error) {
			console.log(error);
		}
	};

	const createTaskList = async (list) => {
		try {
			const res = await createTaskListRequest(list);
		} catch (error) {
			console.log(error);
		}
	};

	const getTasksLists = async () => {
		try {
			const res = await getTaskListRequest();
			setLists(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				lists,
				getTasks,
				createTask,
				createTaskList,
				getTasksLists,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}
