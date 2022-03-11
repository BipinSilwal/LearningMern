import React, { createContext, useContext, useReducer } from "react"
import { CLEAR_ALERT, DISPLAY_ALERT, LOGOUT_USER, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS, TOGGLE_SIDEBAR, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from "./action";
import reducer from "./reducers";
import axios from 'axios';


// adding value of the user, token and location in localStorage...

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location')



// initial value of the global State....
const initialState = {

            isLoading:false,
            showAlert:false,
            alertText:"",
            alertType:"",
            user:user ? JSON.parse(user): null,
            token:token,
            userLocation:userLocation || '',
            jobLocation:userLocation || '',
            showSideBar:false


}

// context helps us to create global state which can be accessed by all the component in the indexjs component
const AppContext = createContext();


const AppProvider = ({children})=>{


        // reducer is triggered when action is done by the user in the page..

        // state is the global state value, dispatch is all about what user action was called or dispatch .
        const [state, dispatch] = useReducer(reducer, initialState);

        //axios

        const authFetch = axios.create({

                        baseURL:'api/v1',
                       


        });

// interceptors are like middleware which helps to get request and response from the server..
        authFetch.interceptors.request.use((config)=>{

                        config.headers.common['Authorization'] = `Bearer ${state.token}`
                        return config


        }, (error)=>{
               return Promise.reject(error)
        })


        // this is the response...
        authFetch.interceptors.response.use(response=>{

                        return response


        }, (error)=>{

                console.log(error.response);
                if(error.response.status === 401){
                   
                        logout()
                }
                return Promise.reject(error)
        })



      // Action called by user to display alert.. dispatch here is the type which triggered the reducer which gives new state..  
        const displayAlert = ()=>{

                    dispatch({type:DISPLAY_ALERT})
        
        
        }
        const clearAlert = ()=>{

                        setTimeout(()=>{
                                dispatch({type:CLEAR_ALERT})
                        }, 3000)
        
        
        }

// here we  are adding the value to the local storage 
        const addUserToLocalStorage = ({user, token, location})=>{

                // setItem is key: value adding...
                        localStorage.setItem('user', JSON.stringify(user));
                        localStorage.setItem('token', token);
                        localStorage.setItem('location', location);


        }

        const removeUserFromLocalStorage = ()=>{

                        // removeItems is key:remove
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        localStorage.removeItem('location');


        }


        // Action for login and register
        const setUpUser = async({currentUser, endPoints, alertText})=>{


                                                        dispatch({type: SETUP_USER_BEGIN });
        // endpoint tells which routes to look for..
        // we get response from the axios with action called  setUpuser which takes input from the user..

                                         try{

                                                        const response = await axios.post(`/api/v1/auth/${endPoints}`, currentUser);
                                                        console.log(response);
                                                        const {user, token, location} = response.data;
                                                        dispatch({
                                                                type:SETUP_USER_SUCCESS,
                                                                payload:{
                                                                        user, 
                                                                        token, 
                                                                        location,
                                                                        alertText
                                                                }
                                                        });

// data which we get from the server is being sent to the local storage..

                                                        addUserToLocalStorage({user,token,location})


                                }catch(error){
                                        console.log(error.response);
                                        dispatch({type: SETUP_USER_ERROR, payload: {msg: error.response.data.msg}});


                                }
                                // we are clearing the Alert created successfully or there was error.
                                clearAlert()

        }

        const updateUser = async(currentUser)=>{


                dispatch({type: UPDATE_USER_BEGIN });
                try{


                                               const {data} = await authFetch.patch('/auth/updateUser', currentUser);

                                               const {user, token, location} = data;
                                                dispatch({
                                                        type: UPDATE_USER_SUCCESS,
                                                        payload: {
                                                                user,
                                                                token, 
                                                                location,
                                                                alertText: currentUser.alertText
                                                        }
                                                
                                                
                                                });

                                                addUserToLocalStorage({user, token, location});



                                } catch(error){

                                                if(error.response.status !== 401){


                                                        dispatch({ 
                                                                
                                                                type: UPDATE_USER_ERROR,
                                                                payload: error.response.data.msg
                                                        
                                                        })
                                                }


                                }                     


                                clearAlert()

        }

        const sideBar = ()=>{

                        return (
                                dispatch({type:TOGGLE_SIDEBAR})
                                )
                        
                        }
       

        const logout = ()=>{

                        dispatch({type: LOGOUT_USER })
                        // we are removing what is in the local storage such as token.. and directed to login page..
                        removeUserFromLocalStorage();

        }


        

// here we are sending global state, action to the component..
        return <AppContext.Provider value={{...state, displayAlert, clearAlert, setUpUser, sideBar, logout, updateUser}}>

                {children}

        </AppContext.Provider>

}

// useContext helps us to get the global state...
const useAppContext = ()=>{
    return useContext(AppContext);
}


export {AppProvider, initialState , useAppContext};