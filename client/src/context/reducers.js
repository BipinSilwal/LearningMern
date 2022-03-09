import { CLEAR_ALERT, DISPLAY_ALERT, LOGOUT_USER, SETUP_USER_BEGIN, SETUP_USER_ERROR, SETUP_USER_SUCCESS, TOGGLE_SIDEBAR } from "./action";
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
            
                return {
                        ...state, isLoading:true
                }
            
            case SETUP_USER_SUCCESS:
            
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
            
            
        

    
    default:
        throw new Error (`no such action!!`)
}


};


export default reducer;