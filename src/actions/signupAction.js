import axios from "axios";

export function userSignupRequest(userData){
    return dispatch=>{
        return axios.post('http://mosaic.nativebyte.in/api/auth/signup',userData)
    }
}