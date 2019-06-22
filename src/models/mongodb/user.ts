import mongoose from 'mongoose';

// schema
const userSchema = new mongoose.Schema({
  id : {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  pw: {
    type: String,
    required: true,
    trim: true
  },
  relative_mem: { // users memory power!!
    type: Number, // 1/2, 1, 4 -> d in e^(-t/n*d)
    required: true,
  }
},
{
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
