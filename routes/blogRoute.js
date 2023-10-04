const {Blog,ValidateAddBlog,ValidateUpdateBlog}=require("../models/Blog");
const express=require("express");
const asynchandler=require("express-async-handler");
const router=express.Router();



/**
 * @description  Add New blog
 * @route        /add
 * @method       post
 * @access       public
 */

router.post("/add", asynchandler( async(req,res)=>{
    const {error}=ValidateAddBlog(req.body);
    if(error)
       return res.status(400).json({message: error.details[0].message});

    
    const blog= new Blog({
        title:req.body.title,
        description:req.body.description
    });
    await blog.save();
    res.status(200).json(blog);
}))

/**
 * @description  edit  blog
 * @route        /edit
 * @method       PUT
 * @access       public
 */

router.put("/edit/:id", asynchandler( async(req,res)=>{
    const {error}=ValidateUpdateBlog(req.body);
    if(error)
       return res.status(400).json({message: error.details[0].message});

    
       const updateBlog= await Blog.findByIdAndUpdate(req.params.id,
        {
          $set: req.body
        },
        {new:true});
      
        res.status(200).json(updateBlog);
}))


/**
 * @description  delete blog
 * @route        /delete
 * @method       DELETE
 * @access       public
 */

router.delete("/delete/:id", asynchandler( async(req,res)=>{
    
    
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        res.status(401).send({message:"Blog is not found"});
    }else{

        await Blog.findByIdAndDelete(req.params.id);
        
        res.status(200).json({message:"blog has deleted succsefully"});
    }

}));


/**
 * @description  Get blog by id
 * @route        /:id
 * @method       GET
 * @access       public
 */

router.get("/:id", asynchandler( async(req,res)=>{
    
    
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        res.status(401).send({message:"Blog is not found"});
    }else
        
        res.status(200).json(blog);

}));

/**
 * @description  Get all blogs
 * @route        /
 * @method       GET
 * @access       public
 */

router.get("/", asynchandler( async(req,res)=>{
    
    
    const blogs = await Blog.find();
    if(!blogs){
        res.status(401).send({message:"Blog database is empty ...."});
    }else
        
        res.status(200).json(blogs);

}));

module.exports=router