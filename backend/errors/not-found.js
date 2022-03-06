import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./custom-api.js";

export class NotFoundError extends CustomApiError{

    constructor(message){
            super(message);
            this.StatusCode = StatusCodes.NOT_FOUND


    }


}
