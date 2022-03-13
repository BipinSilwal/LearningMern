import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'

const AllJob = () => {

    const { jobs, totalJobs, allJobs } = useAppContext();


 
      useEffect(()=>{

          allJobs();

      }, [])

  return (
<>

    <div>

      <h1>{`Total Jobs :${totalJobs}`}</h1>


      {
        jobs.map(data=>{

            const {position, company, location, status, jobType} = data;
              return (<>
              
              <div style={{backgroundColor:'red'}}>
                <h3>{position}</h3>
                <h3>{company}</h3>
                <h3>{location}</h3>
                <h3>{status}</h3>
                <h3>{jobType}</h3>
              
                </div>
              
              </>
                 


              )


        }

          
          )
      }


    </div>


</>


  )
}

export default AllJob