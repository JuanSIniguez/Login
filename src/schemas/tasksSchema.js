import { z } from 'zod';

export const createTaskSchema = z.object({
	title: z.string({
		required_error: 'Debe ingresar un titulo',
	}),
	description: z.string({
		required_error: 'Debe ingresar una descripcion',
	}),
});
