import { z } from 'zod';

export const createListSchema = z.object({
	title: z.string({
		required_error: 'Debe ingresar un titulo',
	}),
});
