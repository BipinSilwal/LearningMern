import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS } from "./action";



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
            
            case REGISTER_USER_BEGIN:{
                return {
                        ...state, isLoading:true
                }
            }
            case REGISTER_USER_SUCCESS:{
                return {
                        ...state,
                        isLoading:false,
                        user:action.payload.user,
                        token:action.payload.token,
                        userLocation:action.payload.location,
                        showAlert:true,
                        alertType:"success",
                        alertText:" User created! Redirecting",
                }
            }
            case REGISTER_USER_ERROR:{
                return {
                        ...state,
                        isLoading:false,
                        showAlert: true,
                        alertType:'danger',
                        alertText:action.payload.msg
                        

                }
            }
        

    
    default:
        throw new Error (`no such action!!`)
}


};


export default reducer;