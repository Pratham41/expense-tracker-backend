const Users = require('../models/user')

exports.userLogin = async (req,res) => {
    const { email, password } = req.body;
    try{
        const result = await Users.findOne({email,password})
        if(result){
            res.status(200).json({
                _id:result._id,
                name:result.name,
                email:result.email
            })
        }else{
            return res.status(500).json({message:'invalid credentials !'})
        }
    }
    catch(err){ 
        res.status(500).json({message:'something went wrong !'})
        console.log(err);
    }
}

exports.userRegister = async (req,res) => {
    const { name, email, password } = req.body;
    try{
        const oldUser = await Users.findOne({ email });

        if (oldUser) {
          return res.status(400).json({ message: "User already exists" });
        }
        const result = await Users.create({
            name,
            email,
            password,
          });        
          
        if(result){
            res.status(201).json({
                _id:result._id,
                name:result.name,
                email:result.email
            });
        }
    }
    catch(err){ 
        res.status(500).json({message:'something went wrong !'})
        console.log(err);
    }
}