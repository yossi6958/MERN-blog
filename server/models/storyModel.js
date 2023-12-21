const mongoose = require("mongoose");
const Joi = require("joi");

const storySchema = new mongoose.Schema({
    name: String,
    text: String,
    likes: Array,
    genere: String,
    user_id: String,
    createdAt: { type: Date, default: Date.now }

})
exports.storyModel = mongoose.model("stories", storySchema);

exports.validateStory = (reqBody)=>{
    const joiSchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        text: Joi.string().min(3).max(1000).required(),
        genere: Joi.string().min(3).max(100).allow("")
    })
    return joiSchema.validate(reqBody);
}
