import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signUp, isAuthenticated, registerError } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate('/tasks');
	}, [isAuthenticated]);

	const onSubmit = handleSubmit(async (values) => {
		signUp(values);
	});

	return (
		<div className='flex flex-col items-center justify-center bg-green  p-10 rounded-md  '>
			<h1 className='w-full  text-center px-4 py-6 text-xl font-semibold'>
				Unitenos
			</h1>
			<form onSubmit={onSubmit} className='space-y-3'>
				<input
					type='text'
					{...register('username', { required: true })}
					className='w-full px-4 py-2 text-blue rounded-md'
					placeholder='Ingrese su nombre de usuario'
				/>
				{errors.username && (
					<p className='text-red-500'>El usuario es requerido</p>
				)}
				<input
					type='email'
					{...register('email', { required: true })}
					className='w-full bg-zinc-700 text-blue px-4 py-2 rounded-md'
					placeholder='Ingrese su Email'
				/>
				{errors.username && (
					<p className='text-red-500'>El mail es requerido</p>
				)}
				<input
					type='password'
					{...register('password', { required: true })}
					className='w-full bg-zinc-700 text-blue px-4 py-2 rounded-md'
					placeholder='Ingrese una contraseña, como mínimo 6 caracteres'
				/>
				{errors.username && (
					<p className='text-red-500'>La contraseña es requerida</p>
				)}
				{registerError.map((error, i) => (
					<div className='bg-red-500 p-2 text-white' key={i}>
						{error}
					</div>
				))}
				<button
					type='submit'
					className='w-full bg-slate-900 text-white px-4 py-2 rounded-md'
				>
					Register
				</button>
			</form>
			<p className='flex-wrap text-center px-3 gap-x-2 justify-between'>
				Ya tienes una cuenta??
				<Link
					to='/login'
					className='px-3 text-center text-xl font-semibold'
				>
					Iniciar sesión
				</Link>
			</p>
		</div>
	);
}
export default RegisterPage;
