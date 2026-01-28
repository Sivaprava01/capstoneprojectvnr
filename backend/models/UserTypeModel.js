import mongoose from 'mongoose';


//define user schema
const userSchema=new mongoose.Schema({
    clerkUserId:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageURL:{
        type:String,

    },
    role:{
        type:String,
        enum:["USER","AUTHOR"],
        required:true,
        default:"USER"
    },
    isActive:{
        type:Boolean,
        default:true
    },

},{
    timestamps:true,
    strict:"throw"
});
//create user model
export const User=mongoose.model('User',userSchema);