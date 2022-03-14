import React, { createContext, useContext, useReducer } from "react";
import {
  ADD_JOB,
  CLEAR_ALERT,
  CLEAR_JOB,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  DELETE_JOB_BEGIN,
  DISPLAY_ALERT,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  SET_EDIT_JOB,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from "./action";
import reducer from "./reducers";
import axios from "axios";

// adding value of the user, token and location in localStorage...

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

// initial value of the global State....
const initialState = {
  jobs: [],
  totalJobs: 0,
  page: 1,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSideBar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
};

// context helps us to create global state which can be accessed by all the component in the indexjs component
const AppContext = createContext();

const AppProvider = ({ children }) => {
  // reducer is triggered when action is done by the user in the page..

  // state is the global state value, dispatch is all about what user action was called or dispatch .
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios

  const authFetch = axios.create({
    baseURL: "api/v1",
  });

  // interceptors are like middleware which helps to get request and response from the server..
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // this is the response...
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  // Action called by user to display alert.. dispatch here is the type which triggered the reducer which gives new state..
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // here we  are adding the value to the local storage
  const addUserToLocalStorage = ({ user, token, location }) => {
    // setItem is key: value adding...
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    // removeItems is key:remove
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  // Action for login and register
  const setUpUser = async ({ currentUser, endPoints, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    // endpoint tells which routes to look for..
    // we get response from the axios with action called  setUpuser which takes input from the user..

    try {
      const response = await axios.post(
        `/api/v1/auth/${endPoints}`,
        currentUser
      );
      console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
        },
      });

      // data which we get from the server is being sent to the local storage..

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    // we are clearing the Alert created successfully or there was error.
    clearAlert();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText: currentUser.alertText,
        },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: error.response.data.msg,
        });
      }
    }

    clearAlert();
  };

  const sideBar = () => {
    return dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logout = () => {
    dispatch({ type: LOGOUT_USER });
    // we are removing what is in the local storage such as token.. and directed to login page..
    removeUserFromLocalStorage();
  };

  //JOB part is here...

  const addingJob = ({ name, value }) => {
    dispatch({ type: ADD_JOB, payload: { name, value } });
  };

  const clearJob = () => {
    dispatch({ type: CLEAR_JOB });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_JOB });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };


  const allJobs = async () => {

    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const { data } = await authFetch.get("/jobs");

      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logout();
    }
    clearAlert();
  };

  const setEditJob = async(id) => {

        dispatch({type: SET_EDIT_JOB, payload:{id}})

  };


  const editJob = async()=>{
     
        dispatch({type: EDIT_JOB_BEGIN})

        try {
              const {position, company, jobLocation, jobType, status} = state;
              
             await authFetch.patch(`/jobs/${state.editJobId}`, {position, company, jobLocation, jobType , status}) 

             dispatch({type: EDIT_JOB_SUCCESS})
             dispatch({type: CLEAR_JOB })
      
        } catch (error) {
          if (error.response.status === 401) return;
          dispatch({
            type: EDIT_JOB_ERROR,
            payload: { msg: error.response.data.msg },
          });
        }

        clearAlert()
  }

  const deleteJob = async(jobId) => {

          dispatch({type: DELETE_JOB_BEGIN})

          try{
            await authFetch.delete(`/jobs/${jobId}`);
            //updating our state again after deleting job....
            allJobs();

          }catch(error){
            logout()
          }

  };

  // here we are sending global state, action to the component..
  return (
    <AppContext.Provider
      value={{
        ...state,
        addingJob,
        displayAlert,
        clearAlert,
        setUpUser,
        sideBar,
        logout,
        updateUser,
        clearJob,
        createJob,
        allJobs,
        setEditJob,
        deleteJob,
        editJob
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// useContext helps us to get the global state...
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
