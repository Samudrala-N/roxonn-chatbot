import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: ['https://roxonn.com', 'http://localhost:5173', 'http://localhost:3000']
}));
app.use(express.json());

import chatbotRoutes from './routes/chatbot.routes';
import { handleAuth, handleOAuth2Callback } from './controllers/chatbot.controller';

app.get('/auth', handleAuth);
app.get('/oauth2callback', handleOAuth2Callback);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/chat', chatbotRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
