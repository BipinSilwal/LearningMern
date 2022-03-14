import { UnauthenticatedError } from "../errors/unauthenticated.js";



const checkPermission = (requestUser, resourceUserId)=>{

        if(requestUser.userId === resourceUserId.toString())return

            throw new  UnauthenticatedError ('Not authorized to access this route')




}

export default checkPermission;