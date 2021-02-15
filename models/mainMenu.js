const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainMenuSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
   cateId:Object,
   categories:Array

  },
  { timestamps: true }
);

module.exports = mongoose.model('MainMenu', mainMenuSchema);