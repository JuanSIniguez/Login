import List from '../models/listModel.js';

export const createTaskList = async (req, res) => {
	try {
		const { title } = req.body;
		const newList = new List({
			title,
			user: req.user.id,
		});
		const savedListTask = await newList.save();

		res.json(savedListTask);
	} catch (error) {
		console.log(error);
		console.log('Fallo creación de la lista');
	}
};

export const getTasksLists = async (req, res) => {
	try {
		const lists = await List.find({ user: req.user.id }).populate('user');
		console.log(res);
		res.json(lists);
	} catch (error) {
		console.log(error);
	}
};
