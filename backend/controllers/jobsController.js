import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request.js";
import JOB from "../models/Job.js";


export const createJob = async(req,res)=>{


    // for creating job we need this field from the user..
        const {company, position} = req.body;


        // if blank send bad request error in middleware and then to user..
        
        if(!company || !position){

                throw new BadRequestError('Please provide all the values');


        }

        // we get createBy field from user which need to have user Id to create new one.
        // calling auth middleware to get verified token which contain user Id..
        req.body.createdBy = req.user.userId;

        console.log(req.body.createBy);

        // we create new job all time when there is user logged in..
        const job = await JOB.create(req.body);

        console.log(job);


        // sending response to the user...
        res.status(StatusCodes.CREATED).json({job})





}

export const getAllJobs = (req,res,next)=>{

    res.send(' All jobs');


}

export const updateJob = (req,res,next)=>{

    res.send(' updateJobs ');


}

export const deleteJob = (req,res,next)=>{

    res.send(' deleteJobs ');


}

export const showStats = (req,res,next)=>{

    res.send(' show Stats ');


}




