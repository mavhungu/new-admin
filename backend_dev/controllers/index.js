const jwt = require('express-jwt')
const User = require('../database/models/userModel')

const register = async (req, res)=>{
    const salt = await bcrypt.hash(req.body.password,salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    const result = await user.save()
    const {password,...data} = await result.toJSON()
    res.json(data)
}


const login = async(req, res)=>{
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }
    if(!await bcrypt.compare(req.body.password,user.password)){
        return res.status(404).json({
            message: "invalid credntials"
        })
    }
    const token = jwt.toString({_id:user._id},'secret')
    res.cookie('jwt',token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60* 1000 // 1day
    })
    res.json({message: "success"})
}

const user = async (req, res)=>{
    try {
        const cookie = res.cookies['jwt']
        const claim = jwt.verify(cookie,'secret')
        if(!claim){
            res.status(401).json({message: "unauthenticated"})
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
    login,register,user
}