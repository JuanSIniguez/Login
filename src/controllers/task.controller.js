import Task from '../models/taskModel.js';

export const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.id }).populate('user');
		res.json(tasks);
	} catch (error) {
		console.log(error);
	}
};

export const createTask = async (req, res) => {
	try {
		const { title, description } = req.body;
		const newTask = new Task({
			title,
			description,
			user: req.user.id,
		});
		const savedTask = await newTask.save();
		res.json(savedTask);
	} catch (error) {
		console.log('Fallo creación de tarea');
	}
};

export const getTaskByID = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json(['No se encuentro la tarea']);
		res.json(task);
	} catch (error) {
		console.log(error);
	}
};

export const updateTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!task)
			return res.status(404).json(['No se encontro la tarea a actualiza']);
		res.json(task);
	} catch (error) {
		console.log(error);
	}
};

export const deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task)
			return res.status(404).json(['No se encontro la tarea a eliminar']);
		return res.sendStatus(204);
	} catch (error) {
		console.log(error);
	}
};
