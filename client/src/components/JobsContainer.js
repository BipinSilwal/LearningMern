import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Job from "./Job";
import Loading from "./Loading";
import PaginationContainer from "./PaginationContainer.js";

const JobsContainer = () => {
  const { 
    jobs, totalJobs, allJobs, isLoading,  numOfPages, search, searchType,
    searchStatus,sort,page
  
  } = useAppContext();

  useEffect(() => {
    allJobs();
  }, [search, searchType,searchStatus,sort,page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>{totalJobs} job{jobs.length > 1 && "s"} found </h5>

      <div className="jobs">
        {jobs.map((data) => {
          return <Job key={data._id} {...data} />;
        })}
      </div>
     {numOfPages > 1 && <PaginationContainer/>}
    </Wrapper>
  );
};

export default JobsContainer;
