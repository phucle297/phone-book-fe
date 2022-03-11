import { GET_COMPANIES, GET_COMPANY_BY_ID } from "../types/CompanyType";
const initialState = {
  companies: [],
  company: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES: {
      state.companies = action.companies;
      return { ...state };
    }
    case GET_COMPANY_BY_ID: {
      state.company = action.company;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
