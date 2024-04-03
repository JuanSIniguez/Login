import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const userFound = await User.findOne({ email });
		if (userFound)
			return res.status(400).json({
				message: ['El mail ya esta en uso'],
			});
		const passwordHash = await bcrypt.hash(password, 10); // hashea la contraseña

		const newUser = new User({
			username,
			email,
			password: passwordHash,
		});
		const userSaved = await newUser.save();
		const token = await createAccessToken({ id: userSaved._id });
		res.cookie('token', token);
		res.json({
			message: 'Usuario creado correctamente',
			id: userSaved._id,
			username: userSaved.username,
			email: userSaved.email,
			createdAt: userSaved.createdAt,
			updatedAt: userSaved.updateAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const userFound = await User.findOne({ email }); // busca el usuario
		if (!userFound)
			return res.status(400).json({
				message: ['Usuario no encontrado'],
			});

		const isMatch = await bcrypt.compare(password, userFound.password);
		if (!isMatch) return res.status(400).json(['Credenciales invalidas']);

		const token = await createAccessToken({ id: userFound._id });
		res.cookie('token', token);
		res.json({
			id: userFound._id,
			username: userFound.username,
			email: userFound.email,
			createdAt: userFound.createdAt,
			updatedAt: userFound.updateAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie('token', '', { expire: new Date(0) });
		return res.sendStatus(200);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const profile = async (req, res) => {
	try {
		const userFound = await User.findById(req.user.id);
		if (!userFound)
			return res.status(400).json({
				message: ['Usuario no encontrado'],
			});
		return res.json({
			message: 'Usuario encontrado',
			id: userFound._id,
			username: userFound.username,
			email: userFound.email,
			createdAt: userFound.createdAt,
			updatedAt: userFound.updateAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const verifyToken = async (req, res) => {
	try {
		const { token } = req.cookies;
		if (!token)
			return res.status(401).json({
				message: ['Unauthorized'],
			});
		jwt.verify(token, TOKEN_SECRET, async (err, user) => {
			if (err)
				return res.status(401).json({
					message: ['Unauthorized'],
				});

			const userFound = await User.findById(user.id);
			if (!userFound)
				return res.status(401).json({
					message: ['Unauthorized'],
				});

			return res.json({
				id: userFound._id,
				username: userFound.username,
				email: userFound.email,
			});
		});
	} catch (error) {
		console.log(error);
	}
};
