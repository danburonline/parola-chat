import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'
import conversationsRouter from './routes/api';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
mongoose.connect(uri!, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Database connection established successfully');
});

app.use('/api', conversationsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
