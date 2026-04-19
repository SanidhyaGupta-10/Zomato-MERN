import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route';
import foodRoutes from './routes/food.route';
import foodPartnerRoutes from './routes/food-partner.route';
import cors from 'cors';

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// json, cookie-parser
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => { // request and response
    res.send("Hello World");
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

export default app;