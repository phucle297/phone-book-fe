import { DONE_LOADING, START_LOADING } from "../types/LoadingType";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING: {
      state.isLoading = true;
      return { ...state };
    }
    case DONE_LOADING: {
      state.isLoading = false;
      return { ...state };
    }
    default:
      return { ...state };
  }
};