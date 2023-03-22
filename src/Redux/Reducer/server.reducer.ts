import { AnyAction } from "@reduxjs/toolkit";
import { SERVER_ERROR } from "Redux/Constant/server.constant";


//Server error initial Problem
interface ServerInitial {
    error: boolean
}
//--//
const serverInitial: ServerInitial = {
    error: false
}
//--//
export const serverErrorReducer = (state = serverInitial, action: AnyAction) => {
    switch (action.type) {
        case SERVER_ERROR:
            return {
                error: true
            }
        default:
            return state
    }
}