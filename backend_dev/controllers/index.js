//const jwt = require('express-jwt');
const User = require('../database/models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res)=>{

    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password,salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
    })
    const result = await user.save()
    const {password,...data} = await result.toJSON()
    res.json(data)
}


const login = async(req, res)=>{
    console.log(req.body)
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }
    console.log("User :"+ user);
    if(!await bcrypt.compare(req.body.password,user.password)){
        return res.status(404).json({
            message: "invalid credntials"
        })
    }
    const token = jwt.sign({_id:user._id.toString()},'secret')
    console.log("Token :"+ token)
    res.cookie('jwt',token,{
        httpOnly: true,
        SameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60* 1000 // 1day
    })
    res.json({message: "success"})
}

const users = async function(req, res){
    try {
        const cookie = req.cookies.jwt;
        const claim = jwt.verify(cookie,'secret');
        console.log(claim);
        if(!claim){
            res.status(401).json({message: "unauthenticated try"})
        }
        const user = await User.findOne({_id:claim._id})
        const {password,...data}= await user.toJSON()
        res.json(data)
    } catch (error) {
        res.json({message: "Unauthenticated"})
    }
}

const logout = async (req, res)=>{
    res.cookie('jwt','',{maxAge:0})
    res.json({
        message: 'success'
    })
}

module.exports={
    login,register,users,logout
}