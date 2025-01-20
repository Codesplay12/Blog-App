const userModel = require("../models/userModel")

const bcrypt = require('bcrypt');

exports.registerController = async (req,res) => {
    try {
        const {username,email,password} = req.body

        if(!username || !email || !password)
        {
            return res.status(400).send({
                success:false,
                message:"please fill all feilds"
            })
        }
                 
        // EXISTING USER
        const existingUser = await userModel.findOne({email})
        if(existingUser)
        {
            return res.status(401).send({
                success:false,
                message:"user already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
      

        // SAVE NEW USER
        const user = new userModel({username,email,password:hashedPassword})
        await user.save()
        res.status(201).send({
            success:true,
            message:"New User Created",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:"error in register callback",
            success:false,
            error

        })
        
    }
};

exports.getALLUsers = async (req,res) => {
    try {

        const users = await userModel.find({})
        res.status(200).send({
            userCount: users.length,
            success:true,
            message:"all users data",
            users
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get all users",
            error
        })
        
    }
};



exports.loginController = async (req,res) => {
    try {

        // VALIDATION
        const { email, password } = req.body;

        if(!email || !password )
        {
            return res.status(401).send({
                success:false,
                message:"please provide email or password"
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"email is not registered"

            })
        }
        //PASSWORD

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(401).send({
            success:false,
            message:"Invalid Username or Password"
            })
        }

        return res.status(200).send({
            success:true,
            message:"Login Successfully",
            user,
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in login callback",
            error,
        
    });
}
};


