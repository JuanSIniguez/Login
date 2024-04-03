import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { signIn, isAuthenticated, registerError } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) navigate('/tasks');
	}, [isAuthenticated]);

	const onSubmit = handleSubmit(async (values) => {
		signIn(values);
	});

	return (
		<div className='flex flex-col  items-center justify-center bg-green  p-10 rounded-md '>
			<h1 className='w-full  text-center px-4 py-6 text-xl font-semibold'>
				Log In
			</h1>
			<form onSubmit={onSubmit} className='space-y-3'>
				<input
					type='email'
					{...register('email', { required: true })}
					className='w-full text-blue px-4 py-2 rounded-md'
					placeholder='Ingrese su Email'
				/>
				{errors.username && (
					<p className='text-red-500'>El mail es requerido</p>
				)}
				<input
					type='password'
					{...register('password', { required: true })}
					className='w-full text-blue px-4 py-2 rounded-md'
					placeholder='Ingrese una contraseña, como mínimo 6 caracteres'
				/>
				{errors.username && (
					<p className='text-red-500'>La contraseña es requerida</p>
				)}
				{registerError.map((error, i) => (
					<div className='bg-red-500 p-2 text-white px-4 my-2' key={i}>
						{error}
					</div>
				))}
				<button
					type='submit'
					className='w-full text-white px-4 py-2 rounded-md
					'
				>
					Log In
				</button>
			</form>
			<p className='flex-wrap text-center px-3 gap-x-2 justify-between'>
				Eres nuevo?
				<Link
					to='/register'
					className=' px-3 text-center text-xl font-semibold'
				>
					Registrarme
				</Link>
			</p>
		</div>
	);
}
export default LoginPage;
