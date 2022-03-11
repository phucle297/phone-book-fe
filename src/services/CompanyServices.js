import { http } from "../util/setting";

class CompanyServices {
  getAll() {
    return http.get("/companies/get-all");
  }
  getById(id) {
    return http.get(`/companies/get-by-id/${id}`);
  }
}

const companyServices = new CompanyServices();
export default companyServices;
