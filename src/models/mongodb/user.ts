import mongoose from 'mongoose';

// schema
const userSchema = new mongoose.Schema({
  email : {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  nickname: {
    type: String,
    required: true,
  }
},
{
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
