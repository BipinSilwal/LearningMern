import React from "react";
import FormRow from "./FormRow";
import Wrapper from '../assets/wrappers/SearchContainer'
import { useAppContext } from '../context/appContext'
import Selection from "./Select";

const SearchContainer = () => {

  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    jobTypeOptions,
    statusOptions,
    sort,
    sortOptions,
    clearFilters,
    addingJob
  } = useAppContext();



  const handleSubmit = (e)=>{

      e.preventDefault();

      clearFilters();

  }

  const handleSearch = (e)=>{

      if(isLoading)return
      addingJob({name: e.target.name, value: e.target.value})

  }

  return (
   
    <Wrapper>
    <form className="form">
      <h4>Search Form</h4>

      <div className="form-center">
        <FormRow
          type="text"
          name="search"
          value={search}
          handleChange={handleSearch}
          
        />
       

        <Selection
          labelText='status'
          name="searchStatus"
          value={searchStatus}
          handleChange={handleSearch}
          list={['all', ...statusOptions]}
         
        />
        <Selection
          labelText='job type'
          name="searchType"
          value={searchType}
          handleChange={handleSearch}
          list={['all', ...jobTypeOptions]}
          
        />
        <Selection
          
          value={sort}
          name="sort"
          list={sortOptions}
          handleChange={handleSearch}
          
        />

        
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick ={handleSubmit}
          > 
            clear filters
          </button>

         
        
      </div>
    </form>
  </Wrapper>

  )
}

export default SearchContainer








  

  

 


 

