import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';

export const connectDB = async () => {
	try {
		console.log(MONGODB_URI);
		console.log(process.env.MONGODB_URI);
		await mongoose.connect(MONGODB_URI);
		console.log('Connecting to MongoDB Atlas cluster...');
		console.log('Successfully connected to MongoDB Atlas!');
	} catch (error) {
		console.log(error);
		console.error('Connection to MongoDB Atlas failed!', error);
	}
};
