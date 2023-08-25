import express, { Request, Response } from 'express';
import { tasks } from './data/tasks';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const port = 3000;

app.get('/api', (_, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/tasks', (_, res: Response) => {
  try {
    return res.status(200).json(tasks);
  } catch ({ message }) {
    return res.status(404).send({ message });
  }
});

app.get('/api/tasks/:id', (req, res: Response) => {
  try {
    const { id } = req.params;
    const numberId = parseInt(id);
    const task = tasks.filter((task) => task.id === numberId);
    return res.status(200).json(task);
  } catch ({ message }) {
    return res.status(404).send({ message });
  }
});

app.listen(port, () => {
  console.log(`Server Running Up on port ${port}`);
});
