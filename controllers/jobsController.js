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

  // in url we get query after api/v1/all-jobs?search 
  // req.query gives us value after ?
    const { search, status, jobType, sort } = req.query;


    // creating object so that we can have condition for all value
    const queryObject = {

            createdBy: req.user.userId

    }

// all return us all the document. if not we return what status we have passed in url after ?

    if(status && status !== 'all'){

          queryObject.status = status

    }

    // all return us all the document. if not we return what status we have passed in url after ?
    if(jobType && jobType !== 'all'){

          queryObject.jobType = jobType

    }

    // search exist
    if(search){

      // then position is created what the user is typing and here options 'i' is case-insensitive so.. it searches in the database..
        queryObject.position = { $regex: search, $options:'i' }

    }

    // finding with condition of status and userId.
    
      
    let result = JOB.find(queryObject);


// after we get the result as object we may need to sort in ascending or descending order. 

//minus - is descending. createdAt or position are field.

    if(sort === 'latest'){

        result = result.sort('-createdAt')

    }

    if(sort === 'oldest'){

        result = result.sort('createdAt')

    }

    if(sort === 'a-z'){

        result = result.sort('position')

    }

    if(sort === 'latest'){

        result = result.sort('-position')

    }

      



// page we get from the query.

const page = Number(req.query.page) || 1 ;

// we get limit from the query or we have default 10
const limit = Number(req.query.limit) || 10;

// skip helps us to skip number of document to go to that page..
// in page 2 we skip first page which contain 10 document.  2-1 =1*10 = 10 document escaped..
const skip = (page-1)*limit;

// skip and limit given by mongo database..
result = result.skip(skip).limit(limit);






  // when user is logged in  they have userId which we get through verifying token
  // req can access any value of any middleware so req.user is getting value from token verification.
  const jobs = await result;


  // countDocuments helps us to get all the document count.
  const totalJobs = await JOB.countDocuments(queryObject);

  // we get number of pages with totalJobs & limits
  const numOfPages = Math.ceil(totalJobs/limit);


  res.status(StatusCodes.OK).json({
    status: "success",
    totalJobs,
    jobs,
    numOfPages
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


