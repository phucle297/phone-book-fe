import { http } from "../util/setting";

class UserServices {
  getById(id) {
    return http.get(`/users/get-by-id/${id}`);
  }
  getMyData() {
    return http.get(`/users/get-my-data`);
  }
  getAllUser() {
    return http.get(`/users/get-all-user`);
  }
  deleteUser(id) {
    return http.delete(`/users/delete/${id}`);
  }
}

const userServices = new UserServices();
export default userServices;
