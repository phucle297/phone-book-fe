import { message } from "antd";
import authenticateServices from "../../services/AuthenticateServices";
import { ACCESS_TOKEN } from "../../util/setting";
import { history } from "../../App";
export const LoginAction = (account) => {
  return (dispatch) => {
    let promise = authenticateServices.login(account);
    promise
      .then((res) => {
        localStorage.setItem(ACCESS_TOKEN, res.data.data.token.token);
        localStorage.setItem("email", account.email);

        message.success("Đăng nhập thành công!");
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
};
export const RegisterAction = (account) => {
  return (dispatch) => {
    let promise = authenticateServices.register(account);
    promise
      .then((res) => {
        message.success("Đăng ký thành công!");
        history.push("/auth/login");
      })
      .catch((err) => console.log(err));
  };
};
