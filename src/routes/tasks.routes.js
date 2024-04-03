import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
	createTask,
	getTasks,
	getTaskByID,
	updateTask,
	deleteTask,
} from '../controllers/task.controller.js';
import {
	getTasksLists,
	createTaskList,
} from '../controllers/list.controller.js';
import { validateSchema } from '../middlewares/validator.middeware.js';
import { createTaskSchema } from '../schemas/tasksSchema.js';
import { createListSchema } from '../schemas/listSchema.js';

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTaskByID);
router.post(
	'/tasks',
	authRequired,
	validateSchema(createTaskSchema),
	createTask
);
router.delete('/tasks/:id', authRequired, deleteTask);
router.put('/tasks/:id', authRequired, updateTask);

router.post(
	'/lists',
	authRequired,
	validateSchema(createListSchema),
	createTaskList
);
router.get('/lists', authRequired, getTasksLists);

export default router;
