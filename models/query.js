const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const querySchema = new Schema({
  note: {
    type: String,
    default: "",
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product",
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  phoneNum:{
    type:Number,
  },
  active:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model("Query", querySchema);
