import { User } from '../models/User.js';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';



export const register = async(req,res)=>{

    
                
                const {name, email, password} = req.body;
                
                if(!name || !email || !password  ){

                        throw new BadRequestError('Please provide all the values');

                }

                const userAlreadyExists = await User.findOne({email});

             
                

                if(userAlreadyExists){

                                throw new BadRequestError('Email already in use!!');

                }


                        const user = await User.create({name, email, password});
                        res.status( StatusCodes.CREATED ).json({

                                status:'success',
                                user

                        })


       

        
        


}

export const login = (req,res,next)=>{

    res.send('login User');

}



export const updateUser = (req,res,next)=>{

    res.send('update User');

}


