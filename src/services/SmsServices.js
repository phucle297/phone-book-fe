import { http } from "../util/setting";

class SmsServices {
  sendSms(content, receivers) {
    return http.post("/sms/send-sms", { content, receivers });
  }
}

const smsServices = new SmsServices();
export default smsServices;
