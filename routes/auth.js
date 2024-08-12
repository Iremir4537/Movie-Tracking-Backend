import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req,res) =>{
    try {
        const {username,emailaddress,password} = req.body
        const userCheck = await User.findOne({username,emailaddress})

        if(!userCheck){
            const newUser = await User.create({username,emailaddress,password})
            res.json(newUser)
        }
        else{            
            res.status(400).json({error:'userexists'})
        }
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/login', async (req,res) => {
    try {
        const {username,password} = req.body

        const user = await User.findOne({username,password})
        if(user){
            var token = jwt.sign({ userName:user.userName,userId:user._id }, process.env.JWTSECRET, { algorithm: 'RS256' },(err,token) => {
                if(err) throw new Error
                res.cookie('token',token).json({id:user._id,userName:user.username})
            });
        }
        else{
            res.status(400).json({error:'usernotfound'})
        }
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router