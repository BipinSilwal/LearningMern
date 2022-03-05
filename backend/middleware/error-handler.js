import { StatusCodes} from 'http-status-codes'

const errorHandlerMiddleware = (err, req,res,next)=>{

            console.log(err);

            if(err.name === 'ValidationError'){

                    const message = Object.values(err.errors).map(value=>value.message).join(',')
               
     
                    res.status(StatusCodes.BAD_REQUEST).json({msg:message});

            }

            // res.status( StatusCodes.INTERNAL_SERVER_ERROR ).json({msg: err });


}

export default errorHandlerMiddleware;