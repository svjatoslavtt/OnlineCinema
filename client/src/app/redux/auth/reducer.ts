import {ActionTypes, ActionTypeUnion} from "./action";

interface AuthInterface {
  user: any;
  errors: any;
}

const authInitialState: AuthInterface = {
  user: null,
  errors: null,
};

export const reducer = (state = authInitialState, action: ActionTypeUnion) => {
  console.log('Action', action);
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    case ActionTypes.REGISTER_FAILED:
      return {
        ...state,
        errors: action.payload.message
      }
    default: return state
  }
}