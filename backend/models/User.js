import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



const userSchema = new mongoose.Schema({

            name:{
                type:String,
                required:[true, 'Please Provide name'],
                minLength:3,
                maxLength:20,
                trim:true
            },
            email:{
                type:String,
                required:[true, 'Please Provide email'],
                validate:{
                    validator:validator.isEmail,
                    message:'Please provide a valid email'
                },
                unique:true
                
            },
            password:{
                type:String,
                required:[true, 'Please Provide password'],
                minLength:6,
                select:false,
                
            },
            lastName:{
                type:String,
                trim:true,
                maxLength:20,
                default:'lastName'
            },
            location:{
                type:String,
                trim:true,
                maxLength:20,
                default:'Kathmandu'
            }


});



userSchema.pre('save', async function(){

               const salt =  await bcrypt.genSalt(10);
               this.password = await bcrypt.hash(this.password, salt);

});


userSchema.methods.createJWT = function(){

            return jwt.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRY_DATE});



}




export const User = mongoose.model('User', userSchema);


