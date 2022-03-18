import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/bad-request.js";
import { NotFoundError } from "../errors/not-found.js";
import checkPermission from "../middleware/checkPermission.js";
import JOB from "../models/Job.js";
import moment from 'moment';

export const createJob = async (req, res) => {
  // for creating job we need this field from the user..
  const { company, position } = req.body;

  // if blank send bad request error in middleware and then to user..

  if (!company || !position) {
    throw new BadRequestError("Please provide all the values");
  }

  // we get createBy field from user which need to have user Id to create new one.
  // calling auth middleware to get verified token which contain user Id..
  req.body.createdBy = req.user.userId;

  // we create new job all time when there is user logged in..
  const job = await JOB.create(req.body);

  // sending response to the user...
  res.status(StatusCodes.CREATED).json({ job });
};


export const getAllJobs = async (req, res, next) => {
  // when user is logged in  they have userId which we get through verifying token
  // req can access any value of any middleware so req.user is getting value from token verification.
  const jobs = await JOB.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({
    status: "success",
    jobs,
    totalJobs: jobs.length,
    numOfPages: 1,
  });
};


export const updateJob = async (req, res, next) => {
  // when user click edit button, it triggers the id which we getting from the url.. params helps to get value from url.
  const { id: jobId } = req.params;

  // value input by the user in the frontend..
  const { company, position } = req.body;

  // error if no value
  if (!company || !position) {
    throw new BadRequestError("Please provide all the values");
  }

  // finding document in database by searching the id
  const job = await JOB.findOne({ _id: jobId });

  // if no document error
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  // only can be updated by same user who created the job...
  checkPermission(req.user, job.createdBy);

  // we update our req.body by getting id.. using findByIdAndUpdate since we dont have hook in JOBMODEL, otherwise we use save function to update value..
  // hook in model will be trigger using save function but not findByIdAndUpdate
  const updateJob = await JOB.findByIdAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updateJob });
};


export const deleteJob = async (req, res, next) => {
  // when user click edit button, it triggers the id which we getting from the url.. params helps to get value from url.
  const { id: jobId } = req.params;

  // finding document in database by searching the id
  const job = await JOB.findOne({ _id: jobId });

  // if no document error
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  // only can be deleted by same user who created the job...
  checkPermission(req.user, job.createdBy);

  // remove the document from database...
  await job.remove();

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "job deleted!!",
  });
};


export const showStats = async (req, res) => {

    // we match all the user who created job from middleware and add those value 
    //we group them using the field type. here we need status so we are using status.
  let stats = await JOB.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  console.log(stats);

  // reduce array helps us to get single total digit whether its object, array, or number ..
  stats = stats.reduce((acc,curr)=>{

        //acc is total value
        // curr we getting from database as object

        //destructing the value we get from database
        const {_id:title, count} = curr;

        // creating new object of acc with count value.. 
        acc[title]= count;
        return acc;



  }, {});


  // when user just register and haven't add job we cant break our stats so we create default stats..
  const defaultStats = {

            pending: stats.pending || 0,
            interview: stats.interview || 0,
            declined: stats.declined || 0,

  }

  let monthlyApplications = await JOB.aggregate([

        { $match :{ createdBy: mongoose.Types.ObjectId(req.user.userId)  }},
        { $group :{ 
                  _id:
                        {
                          year:{ $year:'$createdAt',}, 
                          month:{$month:'$createdAt'}, 
                         },
                         count:{$sum:1},
                    }
        },
        {$sort: {'_id.year':-1, '_id.month':-1}},
        {$limit: 6}

  ]);

  monthlyApplications = monthlyApplications.map((item)=>{

          const { _id:{year, month},  count} = item
          const date = moment()
              .month(month -1)
              .year(year)
              .format('MMM Y')
              return {date, count}
  })

    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications});

};


