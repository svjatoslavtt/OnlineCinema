import {ActionTypes, ActionTypeUnion} from "./action";

export interface AuthInterface {
  user: any;
  token: string | null;
  errors: string;
  loading: false;
}

const authInitialState: AuthInterface = {
  user: null,
  token: localStorage.getItem('token'),
  errors: '',
  loading: false,
};

export const reducer = (state = authInitialState, action: ActionTypeUnion) => {
  console.log('Action', action);
  switch (action.type) {
    case ActionTypes.REGISTER_REQUEST:
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        errors: '',
      }
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        errors: '',
        loading: false,
      }
    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        errors: action.payload.message,
        loading: false,
      }
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        errors: '',
        loading: false,
      }
    case ActionTypes.REGISTER_FAILED:
      return {
        ...state,
        errors: action.payload.message,
        loading: false,
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