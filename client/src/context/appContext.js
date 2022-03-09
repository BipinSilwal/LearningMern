import React, { createContext, useContext, useReducer } from "react"
import { CLEAR_ALERT, DISPLAY_ALERT, LOGOUT_USER, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS, TOGGLE_SIDEBAR } from "./action";
import reducer from "./reducers";
import axios from 'axios';


const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location')

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


const AppContext = createContext();


const AppProvider = ({children})=>{

        const [state, dispatch] = useReducer(reducer, initialState);


        const displayAlert = ()=>{

                    dispatch({type:DISPLAY_ALERT})
        
        
        }
        const clearAlert = ()=>{

                        setTimeout(()=>{
                                dispatch({type:CLEAR_ALERT})
                        }, 3000)
        
        
        }


        const addUserToLocalStorage = ({user, token, location})=>{

                        localStorage.setItem('user', JSON.stringify(user));
                        localStorage.setItem('token', token);
                        localStorage.setItem('location', location);


        }

        const removeUserFromLocalStorage = ()=>{

                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        localStorage.removeItem('location');


        }


        const setUpUser = async({currentUser, endPoints, alertText})=>{


                                                        dispatch({type: SETUP_USER_BEGIN });
        

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

                                                        addUserToLocalStorage({user,token,location})


                                }catch(error){
                                        console.log(error.response);
                                        dispatch({type: SETUP_USER_ERROR, payload: {msg: error.response.data.msg}});


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
                        removeUserFromLocalStorage();

        }

        return <AppContext.Provider value={{...state, displayAlert, clearAlert, setUpUser, sideBar, logout}}>

                {children}

        </AppContext.Provider>

}

const useAppContext = ()=>{
    return useContext(AppContext);
}


export {AppProvider, initialState , useAppContext};