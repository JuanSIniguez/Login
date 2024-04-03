import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext'; //por qué los {} ??
import { TaskCard } from '../components/TaskCard';
import { TaskList } from '../components/TaskList';

function TaskPage() {
	const { tasks, getTasks, lists, getTasksLists } = useTasks();

	useEffect(() => {
		getTasks();
		getTasksLists();
	}, []);
	return (
		<div className='flex justify-center items-center m-5'>
			<div className='grid md:grid-cols-2 lg:grid-cols-3 w-3/5 bg-lightgreen my-5 text-right text-crema '>
				<h1 className='font-bold text-3xl col-span-3 text-end my-3 mx-5 px-5'>
					Administrador de tareas
				</h1>

				<div className='col-span-1 mb-5 ml-5 border-2 border-blue border- rounded'>
					<div className='text-center font-bold text-xl border-b-2 border-blue'>
						Listas
					</div>
					{lists.map((list) => (
						<TaskList list={list} key={list._id} />
					))}
				</div>
				<div className='col-span-2 mb-5 mr-5 border-2 border-blue rounded'>
					<div className='text-center font-bold text-xl border-b-2 border-blue'>
						Tareas
					</div>

					{tasks.map((task) => (
						<TaskCard task={task} key={task._id} />
					))}
				</div>
			</div>
		</div>
	);
}

export default TaskPage;
