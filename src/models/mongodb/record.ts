import mongoose from 'mongoose';

// schema
const recordSchema = new mongoose.Schema({
  id : {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  alarm_status: {
    type: Boolean,
    required: true
  },
  retrieve_num: {
    type: Number,
    default: 1
  },
  base_time: {
    type: Date
  }
},
{
  timestamps: true
});

const RecordModel = mongoose.model('Record', recordSchema);
export default RecordModel;