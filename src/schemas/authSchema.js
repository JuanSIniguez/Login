import { z } from 'zod';

export const registerSchema = z.object({
	username: z.string({
		required_error: 'Debe ingresar un nombre de usuario',
	}),
	email: z
		.string({ required_error: 'Debe ingresar un mail' })
		.email({ message: 'El mail debe tener un formato @' }),
	password: z
		.string({ required_error: 'La contraseña es requerida' })
		.min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Debe ingresar un mail' })
		.email({ message: 'El mail debe tener un formato @' }),
	password: z
		.string({ required_error: 'La contraseña es requerida' })
		.min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});
