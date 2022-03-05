import {User} from '../models/User.js';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';


export const register = async(req,res)=>{

    
         
                
                        const user = await User.create(req.body);
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