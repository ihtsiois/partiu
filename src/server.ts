import dotenv from 'dotenv';
import { buildApp } from '@/app';

// Config .env files
dotenv.config();

// Build App
const app = buildApp();

// Start Server Listening
app.listen({ port: 3333 }).then(() => {
    console.log('✅ Api running at http://localhost:3333');
    if (process.env.NODE_ENV == 'development') console.log('📚 Check api documentation at http://localhost:3333/docs');
});
