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
  mem_power: { // users memory power!!
    type: Number, // 1->1/2, 1->2, 3->4 -> d in e^(-t/n*d)
    required: true,
  },
  category : {
    type: Array,
    required: true,
    default: ['default']
  },
  records : {
    type: Array,
    default: []
  }
},
{
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
