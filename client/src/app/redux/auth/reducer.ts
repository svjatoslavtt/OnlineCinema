import {ActionTypes, ActionTypeUnion} from "./action";

export interface AuthInterface {
  user: any;
  token: string | null;
  errors: string;
}

const authInitialState: AuthInterface = {
  user: null,
  token: localStorage.getItem('token'),
  errors: '',
};

export const reducer = (state = authInitialState, action: ActionTypeUnion) => {
  console.log('Action', action);
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
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
        errors: action.payload.message
      }
    case ActionTypes.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('id');

      return {
        ...state,
        token: null,
        user: null,
      }
    default: return state
  }
}