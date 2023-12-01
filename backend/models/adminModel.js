import mongoose from 'mongoose';
const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    profilePicture: { type: String },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
