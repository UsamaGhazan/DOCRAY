import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import doctorRoutes from './Routes/doctorRoutes.js';
import patientRoutes from './Routes/patientRoutes.js';
import stripeRoutes from './Routes/stripeRoutes.js';
import imageUpload from './Routes/imageUpload.js';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import {
  notFound,
  errorHandler,
} from './Middlewares/errorHandlerMiddleware.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/image', imageUpload);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

//connection event tells when someone is connected to the server
io.on('connection', (socket) => {
  console.log('socket.id ', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with id ${socket.id} joined room ${data} `);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected ', socket.id);
  });
});

//Making the upload folder static so we can access it from frontend
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
