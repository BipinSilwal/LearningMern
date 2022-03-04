

export const notFoundMiddleware = (req,res)=>{

        res.status(404).send('This page is not found!!');

}