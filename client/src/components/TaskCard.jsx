import React from 'react';
import { useTasks } from '../context/TaskContext';

export function TaskCard({ task }) {
	return (
		<div className=' px-5'>
			<ul className='flex flex-col border-b-2 border-blue'>
				<li>{task.title}</li>
				<li>{task.description}</li>
			</ul>
		</div>
	);
}
