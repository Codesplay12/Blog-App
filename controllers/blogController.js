const  mongoose  = require("mongoose");
const blogModel = require("../models/blogModel")
const userModel = require("../models/userModel")

exports.getAllBlogsController = async (req,res) =>{
    try {
        const blogs = await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"No Blogs found"
            })
        }

        return res.status(200).send({
            success:true,
            BlogCount : blogs.length,
            message:"All Blog List",
            blogs
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while Getting Blogs",
            error
        })
        
    }
};

exports.createBlogController = async(req,res) => {
    try 
    {
        
    const {title,description,image,user} = req.body;

    //Validation
    if(!title || !description || !image || !user)
    {
        return res.status(400).send({
             success:false,
             message:"please provide all fields"
        })
    }
    const existingUser = await userModel.findById(user)
    if(!existingUser)
    {
        return res.status(404).send({
            success:false,
            message:"unable to find User"
        })
    }


     const newBlog = new blogModel({ title, description, image, user });
        await newBlog.save();

        // Add the blog reference to the user
        existingUser.blogs.push(newBlog);
        await existingUser.save();

        return res.status(201).send({
            success: true,
            message: "Blog created successfully",
            newBlog,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while Getting Blogs",
            error
        })
    }
};

exports.updateBlogController = async(req,res) => {
    try {
        const {id} = req.params;
        const {title,description,image} =req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:"Blog-Updated",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while updating Blogs",
            error
    })
}
}

exports.getBlogIdController = async(req,res) => {
    try {
        const {id} = req.params;
        const blog = await blogModel.findById(id)
        if(!blog)
        {
            return res.status(404).send({
                success:false,
                message:"blog not found with this id"
            })
        }
        return res.status(200).send({
            success:true,
            message:"fetch single blog",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while getting single Blog",
            error
    })
}
}


exports.deleteBlogController = async(req,res) => {
    try {
    const blog =     await blogModel.findByIdAndDelete(req.params.id)
    .populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
          success:true,
          message:"Blog deleted"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while deleting  Blog",
            error
    })
    }
};

//GET USER Blog 

exports.userBlogController = async (req,res)=> {
  try {
     const userBlog = await userModel.findById(req.params.id).populate("blogs")
     if(!userBlog)
     {
        return res.status(404).send({
            success:false,
            message:"BLOGS not found with this id"
        })
     }
     return res.status(200).send({
        success:true,
        message:"user blogs",
        userBlog

     })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
        success:false,
        message:"Error in user  Blog",
        error
  })
}
}