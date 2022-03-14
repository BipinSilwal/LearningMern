import React from "react";
import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendar } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { Link } from "react-router-dom";

const Job = ({
  position,
  company,
  location,
  status,
  jobType,
  createdAt,
  _id,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  let data = moment(createdAt);
  data = data.format("MMM Do, YYYY");
  return (
    <>
      <Wrapper>
        <header>
          <div className="main-icon">{company.charAt(0)}</div>
          <div className="info">
            <h5>{position}</h5>
            <h5>{company}</h5>
            <h5>{data}</h5>
            {/* <h5>{location}</h5>
            <h5>{status}</h5>
            <h5>{jobType}</h5>
            <h5>{data}</h5> */}
          </div>
        </header>

        <div className="content">
          {/*  */}
          <footer>
            <div className="actions">
              <Link
                to="/add-job"
                className="btn edit-btn"
                onClick={() => setEditJob(_id)}
              >
                Edit
              </Link>

              <button type="button" className="btn delete-btn"
                onClick={ ()=>deleteJob(_id) }
              >
                delete
              </button>
            </div>
          </footer>
        </div>
      </Wrapper>
    </>
  );
};

export default Job;
