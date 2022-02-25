import UserServices from "../../services/UserServices";
import { GET_USER_INFO } from "../types/UserType";
export const getUserInfoAction = (id) => {
  return (dispatch) => {
    const promise = UserServices.getById(id);
    promise.then((res) => {
      console.log(res);
      dispatch({ type: GET_USER_INFO, userDetail: res.data });
    });
  };
};
