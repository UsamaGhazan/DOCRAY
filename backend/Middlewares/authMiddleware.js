import jwt from 'jsonwebtoken';
import asynHandler from 'express-async-handler';
import Patient from '../Models/patientModel.js';

const protect = asynHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      console.log(verify);
      //Identifying user after getting the token from frontend and verifying it
      req.user = await Patient.findById(verify.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
});

export { protect };
