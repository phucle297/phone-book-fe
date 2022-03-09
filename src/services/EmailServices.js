import { http } from "../util/setting";

class EmailServices {
  attachFile(file) {
    return http.post("/emails/attach-file", file);
  }
  sendEmail(email) {}
}

const emailServices = new EmailServices();
export default emailServices;
