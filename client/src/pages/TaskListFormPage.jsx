import { useForm } from 'react-hook-form';

import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useTasks } from '../context/TaskContext';

function TaskListFormPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { createTaskList } = useTasks();

	const onSubmit = handleSubmit(async (values) => {
		createTaskList(values);
	});

	return (
		<div className='flex flex-col items-center justify-center bg-green p-10 rounded-md '>
			<h1 className='w-full text-white text-center px-4 py-6'>
				Añadir lista
			</h1>
			<form onSubmit={onSubmit} className='space-y-3'>
				<input
					type='text'
					{...register('title', { required: true })}
					className='w-full  px-4 py-2 rounded-md text-blue'
					placeholder='Titulo de lista'
				/>

				<button
					type='submit'
					className='rounded-full h-24 w-24 flex  items-center justify-center border-green-500 border'
				>
					✔
				</button>
			</form>
		</div>
	);
}

export default TaskListFormPage;
