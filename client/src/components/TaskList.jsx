import React from 'react';

export function TaskList({ list }) {
	return (
		<div className=' px-5'>
			<ul className='flex flex-col border-b-2 border-blue text-white'>
				<li>{list.title}</li>
			</ul>
		</div>
	);
}
