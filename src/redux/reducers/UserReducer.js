/* eslint-disable import/no-anonymous-default-export */
import { GET_USER_INFO } from "../types/UserType";

const initialState = {
  userDetail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return { ...state, userDetail: action.userDetail };

    default:
      return { ...state };
  }
};
