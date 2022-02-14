import { http } from "../util/setting";
class AuthenticateServices {
  login(user) {
    return http.post("/users/login", user);
  }
  register(user) {
    return http.post("/users/register", user);
  }
}

const authenticateServices = new AuthenticateServices();

export default authenticateServices;
