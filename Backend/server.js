import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import * as sockets from './sockets/index.js';
import * as simulator from './jobs/simulator.js';
import routes from './routes/index.js';
import { optionalAuth } from './middlewares/auth.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173',
    
  ],
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('server is running');
});

// ETA APIs yahan lagte hain
app.use(optionalAuth);
app.use('/api', routes);

(async () => {
  await connectDB();
  const port = process.env.PORT || 5000;
  const server = app.listen(port, () => console.log(`API on :${port}`));
  sockets.init(server);
  if (process.env.SIMULATOR !== 'false') {
    simulator.start(Number(process.env.SIM_TICK_MS) || 4000);
  }
})().catch(e => { console.error(e); process.exit(1); });