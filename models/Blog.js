const Joi = require("joi");
const mongoose=require("mongoose");
const blogSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:20,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100
    }

}, {timestamps: true});

const Blog=mongoose.model("Blog",blogSchema);

// validate Add new blog

function ValidateAddBlog(obj){
    const schema=Joi.object({
        title: Joi.string().trim().max(20).min(2).required(),
        description: Joi.string().trim().max(100).min(5).required()
        
    });
    return schema.validate(obj);
}
// validate update blog

function ValidateUpdateBlog(obj){
    const schema=Joi.object({
        title: Joi.string().trim().max(20).min(2),
        description: Joi.string().trim().max(100).min(5)
        
    });
    return schema.validate(obj);
}


module.exports={
    Blog,
    ValidateAddBlog,
    ValidateUpdateBlog
};