import { http } from "../util/setting";

class SmsServices {
  sendSms(content, receivers) {
    return http.post("/sms/send-sms", { content, receivers });
  }
  getAllSmsReceive() {
    return http.get("/sms/get-all-sms-receive");
  }
  getAllSmsSent() {
    return http.get("/sms/get-all-sms-sent");
  }
  searchSms(searchContent) {
    return http.get(`/sms/search/${searchContent}`);
  }
}

const smsServices = new SmsServices();
export default smsServices;
