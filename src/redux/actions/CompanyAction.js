import companyServices from "../../services/CompanyServices";
import { GET_COMPANIES, GET_COMPANY_BY_ID } from "../types/CompanyType";
export const getAllCompanyAction = () => {
  return (dispatch) => {
    const promise = companyServices.getAll();
    promise.then((res) => {
      dispatch({ type: GET_COMPANIES, companies: res.data.data });
    });
  };
};
export const getCompanyByIdAction = (id) => {
  return (dispatch) => {
    const promise = companyServices.getById(id);
    promise.then((res) => {
      dispatch({ type: GET_COMPANY_BY_ID, company: res.data.data });
    });
  };
};
