import axios from "axios";
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}


export function login(data){
    return dispatch=>{
        return axios.post('http://mosaic.nativebyte.in/api/auth/signin',data).then(res=>{
               
        const token=res.data.data;
            
            localStorage.setItem('jwtToken',token)
            setAuthorizationToken(token)
            dispatch(setCurrentUser(jwt.decode(token)))
            
        })
    }
}