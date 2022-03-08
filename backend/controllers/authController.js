import { User } from '../models/User.js';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';




export const register = async(req,res)=>{

    
               // users send data for registration........ 
                const {userName, email, password} = req.body;

                

                // if user click submit button without filling the form...
                if(!userName || !email || !password  ){

                        throw new BadRequestError('Please provide all the values');

                }


                // user with email already exist
                const userAlreadyExists = await User.findOne({email});

             
                

                if(userAlreadyExists){

                                throw new BadRequestError('Email already in use!!');

                }

                // we create document in User model.

                const user = await User.create({userName, email, password});

                // after user is created in database we generate random token value

                const token = user.createJWT();


                // sending information to the client.......
                        res.status( StatusCodes.CREATED ).json({

                                status:'success',
                                
                                user:{
                                        name:user.name,
                                        email:user.email,
                                        lastName:user.lastName,
                                        location:user.location,


                                },
                                location:user.location,
                                token

                        })


       

        
        


}

export const login = async(req,res,next)=>{

        
        // user login with this information
        const {email,password} = req.body;


        // no information but submit is clicked
        if(!email || !password){

                        throw new BadRequestError('Please provide all values');

        }

        // check user with email and password
        const user = await User.findOne({email}).select('+password');

    

        // no such user exist

        if(!user){

                        throw new UnauthenticatedError('Invalid Credentials')

        }

        // if user exist we compare the password send by user to the password hashed in database.....
        const isPasswordMatched = await user.comparePassword(password);

        // if password doesn't match
        if(!isPasswordMatched){

                        throw new UnauthenticatedError('Invalid credentials');

        }

        // if match we send random token to the client
        const token = user.createJWT();

        // after password is compared the password is made undefined so that it doesn't get send and store in local storage or cookies. Security is main issue here..
        user.password = undefined;

      

        // data is send to the user
        res.status(StatusCodes.OK).json({
                        
                        status:"success",
                        user,
                        token,
                        location:user.location

        })


}



export const updateUser = (req,res,next)=>{

    res.send('update User');

}


