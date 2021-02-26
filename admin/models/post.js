const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: true
    },
    desc:{
      type: String,
      required: true
    },
    slug:{
      type: String,
      required: true
    },
    categories:[{
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: true
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
