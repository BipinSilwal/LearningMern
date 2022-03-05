import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';



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

})




export const User = mongoose.model('User', userSchema);


