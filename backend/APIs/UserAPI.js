import express from 'express';
import {User} from '../models/UserTypeModel.js';
export const userRouter=express.Router();
import {getAuth} from '@clerk/express';

//routes

//read user
userRouter.get('/me',async (req,res)=>{
    //get users userid
    const {userId}=getAuth(req);
    //if user not authenticated return 401
    if(!userId){
        return res.status(401).json({
            error:"UNAUTHORIZED",
            message:"Unauthorized"});
        }
//if user id exists read user from db
        let user =await User.findOne({clerkUserId:userId});
        console.log("User found:",user);
        if(user===null){
            res.json({firstLogin:true});
        }
        else{
            res.status(200).json({firstLogin:false,payLoad:user});
        }
})
//create user
userRouter.post('/create-user',async (req,res)=>{})
