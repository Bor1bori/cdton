import mongoose from 'mongoose';

// schema
const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  Categorys : {
    type: Array,
    required: true,
  }
},
{
  timestamps: true
});

const CategoryModel = mongoose.model('Category', categorySchema);
export default CategoryModel;
