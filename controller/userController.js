import User from "../model/userModel.js";


export const create = async(req,res) =>{
    try{
        console.log("Received data:", req.body);
        const newUser = new User(req.body);
        const {email} = newUser;
        const userExist = await User.findOne({ email})
        if(userExist) {
            return res.status(400).json({message: "user already exists."});
        }
        const savedData = await newUser.save();
        console.log("User saved:", savedData);
        res.status(200).json(savedData)
}catch(error){
        console.log("Error:", error.message);
        res.status(500).json({errorMessage:error.message})
    }
}

export const getAll = async(req,res) =>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({errorMessage:error.message})
    }
};


export const getAllUsers = async(req,res) =>{
    try{
        const userData = await User.find();
        if(!userData || userData.length === 0){
            return res.status(404).json({message:"user data not found"})
        }
        res.status(200).json(userData);
    }
        catch (error) {
             res.status(500).json({errorMessage:error.message})

        }
    
}

export const getUserById = async(req, res) =>{
    try{
        console.log("getUserById called with", req.params);
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist){
            return res.status(404).json({message:"user not found"});
        }
        res.status(200).json(userExist);

    } catch(error){
        console.log("getUserById error", error);
        res.status(500).json({errorMessage:error.message});

    }
}

export const update = async (req,res) => {
    try{
        console.log("update called with", req.params, req.body);
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist){
            return res.status(404).json({message:"user not found"});
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body,{
            new:true
        });
        res.status(200).json(updatedData);

    } catch (error){
         console.log("update error", error);
         res.status(500).json({errorMessage:error.message});

    }
}