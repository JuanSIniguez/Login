import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

import { ProtectedRoutes } from './Routes';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import TaskFormPage from './pages/TaskFormPage';
import Navbar from './components/Navbar';
import TaskListFormPage from './pages/TaskListFormPage';

function App() {
	return (
		<AuthProvider>
			<TaskProvider>
				<BrowserRouter>
					<Navbar />
					<main className='container content-container mx-auto px-10 md:px-0"'>
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
							<Route element={<ProtectedRoutes />}>
								<Route path='/tasks' element={<TaskPage />} />
								<Route path='/add-task' element={<TaskFormPage />} />
								<Route path='/tasks/:id' element={<TaskFormPage />} />
								<Route
									path='/add-list'
									element={<TaskListFormPage />}
								/>
								<Route
									path='/profile'
									element={<h1>Your profile</h1>}
								/>
							</Route>
						</Routes>
					</main>
				</BrowserRouter>
			</TaskProvider>
		</AuthProvider>
	);
}

export default App;
