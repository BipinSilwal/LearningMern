import React from "react";
import FormRow from "../../components/FormRow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import Alert from '../../components/Alert'
import { useAppContext } from "../../context/appContext";
import Selection from "../../components/Select";


const AddJob = () => {
  const {
    isLoading,
    showAlert,
    isEditing,
    position,
    jobLocation,
    company,
    displayAlert,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    addingJob,
    clearJob,
    createJob,
    clearAlert
  } = useAppContext();

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      clearAlert(); 
      return
    }


    if(isEditing){

        return 
        
      }
      
      createJob();
    

  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    addingJob({name, value})

    

  };

  

  return (
    <>
      <Wrapper>
        <form className="form">
          <h3>{isEditing ? "edit Job" : "add job"}</h3>

          {showAlert && <Alert/>}

          <div className="form-center">
            <FormRow
              type="text"
              name="position"
              value={position}
              labelText="Position"
              handleChange={handleJobInput}
            />
            <FormRow
              type="text"
              name="company"
              value={company}
              labelText="Company"
              handleChange={handleJobInput}
            />
            <FormRow
              type="text"
              name="Location"
              value={jobLocation}
              labelText="Location"
              handleChange={handleJobInput}
            />

            <Selection
              name="status"
              value={status}
              list={statusOptions}
              handleChange={handleJobInput}
            />
            <Selection
              name="job Type"
              value={jobType}
              list={jobTypeOptions}
              handleChange={handleJobInput}
            />

            <div className="btn-container">
              <button
                className="btn btn-block submit-btn"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                
                submit
              </button>

              <button
                className="btn btn-block clear-btn"
                onClick={
                  (e)=>{
                  e.preventDefault()
                  clearJob()
                  }
                }
              >
                clear
              </button>
            </div>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default AddJob;
