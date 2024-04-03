import app from './app.js';
import { PORT } from './config.js';

import { connectDB } from './db.js';

async function main() {
	try {
		connectDB();
		app.listen(PORT);
		console.log('Server on port', PORT);
		console.log(`Environment: ${process.env.NODE_ENV}`);
	} catch (error) {
		console.log(error);
	}
}

main();
