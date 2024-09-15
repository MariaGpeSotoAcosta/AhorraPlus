import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import formRoutes from './routes/form.routes.js';
import costsRoutes from './routes/costs.routes.js';
import chatbotRoutes from './routes/ai.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', formRoutes);
app.use('/api', costsRoutes);
app.use('/api', chatbotRoutes);

export default app;
