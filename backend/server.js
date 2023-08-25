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
import dieaseDetectionRoutes from './Routes/diseaseDetectionRoutes.js';
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
app.use('/api/predict', dieaseDetectionRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const emailToSocketIdMap = new Map(); //Currently using name
const socketidToEmailMap = new Map();

//connection event tells when someone is connected to the server
io.on('connection', (socket) => {
  console.log('socket.id "connected" ', socket.id);

  socket.on('join_room', (data) => {
    console.log('data ', data);
    console.log('Join_room');
    const { name, roomId } = data;
    console.log('room ID  ', roomId);
    emailToSocketIdMap.set(name, socket.id);
    socketidToEmailMap.set(socket.id, name);
    // io.to(roomId).emit('user:joined', { name, id: socket.id });
    socket.join(roomId);
  });

  socket.on('send_message', (data) => {
    socket.to(data.roomId).emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected ', socket.id);
  });

  socket.on('user:call', ({ to, offer }) => {
    io.to(to).emit('incomming:call', { from: socket.id, offer });
  });
  socket.on('call:accepted', ({ to, ans }) => {
    io.to(to).emit('call:accepted', { from: socket.id, ans });
  });
  socket.on('peer:nego:needed', ({ to, offer }) => {
    console.log('peer:nego:needed', offer);
    io.to(to).emit('peer:nego:needed', { from: socket.id, offer });
  });

  socket.on('peer:nego:done', ({ to, ans }) => {
    console.log('peer:nego:done', ans);
    io.to(to).emit('peer:nego:final', { from: socket.id, ans });
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
