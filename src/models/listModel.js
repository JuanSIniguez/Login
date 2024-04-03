import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
});

export default mongoose.model('List', listSchema);
