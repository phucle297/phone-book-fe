import { http } from "../util/setting";

class UserServices {
  getById(id) {
    return http.get(`/users/get-by-id/${id}`);
  }
}

const userServices = new UserServices();
export default userServices;
