import { User } from "../../shared/types/auth.types";
import {ActionTypes, ActionTypeUnion} from "./actions";

export interface AuthState {
  user: User | null;
  token: string | null;
  errors: string;
}

const authInitialState: AuthState = {
  user: null,
  token: JSON.parse(localStorage.getItem('token') as string),
  errors: '',
};

export const reducer = (state = authInitialState, action: ActionTypeUnion) => {
  switch (action.type) {
    case ActionTypes.REGISTER_REQUEST:
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        errors: '',
      }
    case ActionTypes.LOGIN_SUCCESS:
			const { user, token } = action.payload;
      localStorage.setItem('user', JSON.stringify({ 
				name: user.name
			}));
      return {
        ...state,
       	user,
        token,
        errors: '',
      }
    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        errors: action.payload.message,
      }
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        errors: '',
      }
    case ActionTypes.REGISTER_FAILED:
      return {
        ...state,
        errors: action.payload.message,
      }
    case ActionTypes.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      return {
        ...state,
        token: null,
        user: null,
      }
    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: '',
      }  
    default: return state
  }
}