import React, { useEffect } from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAppContext } from '../context/appContext';
import Job from './Job'
import Loading from './Loading';

const JobsContainer = () => {

    const { jobs, totalJobs, allJobs, isLoading, page } = useAppContext();


 
      useEffect(()=>{

          allJobs();

      }, [])


if(isLoading){

        return <Loading center />

}

if(jobs.length ===0){

    return (

            <Wrapper>
                <h2>No jobs to display</h2>

            </Wrapper>

    )

}
  return (
  

 <Wrapper>

      <h5>{`${totalJobs} job${jobs.length > 1 && 's'} found`} </h5>

<div className='jobs'>
      {
        jobs.map(data=>{

        
              return (

                  <Job key={data._id} {...data} />
              
              

                
              
              
                 


              )


        }
       

          
          )
      }

</div>

    </Wrapper>


  )
}

export default JobsContainer