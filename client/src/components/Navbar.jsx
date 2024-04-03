import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
	const { isAuthenticated, signOut } = useAuth();

	return (
		<nav className='bg-blue flex justify-between py-5 px-10'>
			<h1 className='text-2xl font bold'>Manager</h1>
			{!isAuthenticated ? (
				<ul className='flex mx-3 gap-4'>
					<li>
						<Link to='/login'>Iniciar sesión</Link>
					</li>
					<li>
						<Link to='/register'>Registrarse</Link>
					</li>
				</ul>
			) : (
				<ul className='flex mx-3 gap-4'>
					<li>
						<Link to='/tasks'>Tareas</Link>
					</li>
					<li>
						<Link to='/add-task'>Agregar tarea</Link>
					</li>
					<li>
						<Link to='/add-list'>Agregar Lista</Link>
					</li>

					<li>
						<Link
							to='/'
							onClick={() => {
								signOut();
							}}
						>
							Cerrar sesión
						</Link>
					</li>
				</ul>
			)}
		</nav>
	);
}

export default Navbar;
