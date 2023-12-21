const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name:String,
  photo: String,
  email:String,
  password:String,
  img_url: String,
  role: {type: String,
    default: "user"
  },
  follows:Array,
  followers:Array,
  date_created:{
    type:Date, default:Date.now
  }
})
exports.userModel = mongoose.model("users",userSchema);

exports.createToken = (_id, userRole) => { 
  const token = jwt.sign({_id, userRole},"maxim", {expiresIn:"6000mins"})
  return token;
}

exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(15).required(),
    // email() -> בודק שהמייל שנשלח במאפיין הגיוני למייל
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(16).required()
  })
  return joiSchema.validate(_reqBody)
}

// validation for login connection
// the validation is different because here we dont have name, we have only email and password
exports.validateLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(16).required()
  })
  return joiSchema.validate(_reqBody)
}