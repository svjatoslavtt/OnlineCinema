import {ActionTypes, ActionTypeUnion} from "./action";

export interface AuthInterface {
  user: any;
  errors: string;
}

const authInitialState: AuthInterface = {
  user: null,
  errors: '',
};

export const reducer = (state = authInitialState, action: ActionTypeUnion) => {
  console.log('Action', action);
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
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
    default: return state
  }
}