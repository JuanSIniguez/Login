import { createContext, useState, useContext, useEffect } from 'react';
import {
	registerRequest,
	loginRequest,
	logoutRequest,
	verifyTokenRequest,
} from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [registerError, setRegisterError] = useState([]);
	const [loading, setLoading] = useState(true);

	const signUp = async (user) => {
		try {
			const res = await registerRequest(user);
			setUser(res.data);
			setIsAuthenticated(true);
		} catch (error) {
			setRegisterError(error.response.data);
		}
	};

	const signIn = async (user) => {
		try {
			const res = await loginRequest(user);
			setUser(res.data);
			setIsAuthenticated(true);
		} catch (error) {
			setRegisterError(error.response.data);
			console.log(error);
		}
	};

	const signOut = async (user) => {
		try {
			const res = await logoutRequest(user);
			setUser(res.data);
			setIsAuthenticated(false);
			Cookies.remove('token');
		} catch (error) {
			setRegisterError(error.response.data);
			console.log(error);
		}
	};

	useEffect(() => {
		if (registerError.length > 0) {
			const timer = setTimeout(() => {
				setRegisterError([]);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [registerError]);

	useEffect(() => {
		async function checkLogin() {
			const cookies = Cookies.get();
			if (!cookies.token) {
				setIsAuthenticated(false);
				setLoading(false);
				return;
			}
			if (cookies.token) {
				try {
					const res = await verifyTokenRequest(cookies.token);
					if (!res.date) {
						setIsAuthenticated(false);
					}
					setLoading(false);
					setIsAuthenticated(true);
					setUser(res.data);
				} catch (error) {
					setIsAuthenticated(false);
					setUser(null);
				}
			}
		}
		checkLogin();
	}, []);
	return (
		<AuthContext.Provider
			value={{
				signUp,
				signIn,
				signOut,
				user,
				isAuthenticated,
				registerError,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
