import { ADD_JOB, CLEAR_ALERT, CLEAR_JOB, CREATE_JOB_BEGIN, CREATE_JOB_ERROR, CREATE_JOB_SUCCESS, DISPLAY_ALERT, LOGOUT_USER, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS, TOGGLE_SIDEBAR, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from "./action";
import { initialState } from "./appContext";



const reducer = (state,  action)=>{

    switch(action.type){

            case DISPLAY_ALERT:
                return {
                    ...state,
                    showAlert:true,
                    alertType:"danger",
                    alertText:'Please provide all fields!!'

                }
            case CLEAR_ALERT:
                return {
                    ...state,
                    showAlert:false,
                    alertType:"",
                    alertText:''

                }
            
            case SETUP_USER_BEGIN:
            case UPDATE_USER_BEGIN:
            case CREATE_JOB_BEGIN:
           
            
                return {
                        ...state, isLoading:true
                }
            
          
                case CREATE_JOB_SUCCESS:
                    return {
                            ...state,
                            isLoading:false,
                            showAlert:true,
                            alertType:"success",
                            alertText:"New job Created !!"
                    }
            
            case SETUP_USER_SUCCESS:
            case UPDATE_USER_SUCCESS:
           
        
            
                return {
                        ...state,
                        isLoading:false,
                        user:action.payload.user,
                        token:action.payload.token,
                        userLocation:action.payload.location,
                        showAlert:true,
                        alertType:"success",
                        alertText:action.payload.alertText,
                }

            
            case SETUP_USER_ERROR:
            case UPDATE_USER_ERROR:
            case CREATE_JOB_ERROR:
           
                return {
                        ...state,
                        isLoading:false,
                        showAlert: true,
                        alertType:'danger',
                        alertText:action.payload.msg
                        

                }
            
            
             

            
                
        
         case TOGGLE_SIDEBAR:
             return {...state, 
                    showSideBar:!state.showSideBar
                }


         case LOGOUT_USER:
             return { ...initialState,
                        user:null,
                        token:null,
                        userLocation:null,
                        jobLocation:null
                    
                }
            
            
        case ADD_JOB:
            return {

                    ...state, [action.payload.name]:action.payload.value

            }

        case CLEAR_JOB:
            return {

                    ...state, ...initialState

            }

    
    default:
        throw new Error (`no such action!!`)
}


};


export default reducer;