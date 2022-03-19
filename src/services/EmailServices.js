import { http } from "../util/setting";

class EmailServices {
  attachFile(file) {
    return http.post("/emails/attach-file", file);
  }
  sendEmail(subject, emailContent, receivers, attachments) {
    return http.post("/emails/send-email", {
      subject,
      emailContent,
      receivers,
      attachments,
    });
  }
  getAllEmailReceived() {
    return http.get("/emails/get-all-emails-receive");
  }
  getAllEmailSent() {
    return http.get("/emails/get-all-emails-sent");
  }
  searchEmail(searchContent) {
    return http.get(`/emails/search/${searchContent}`);
  }
}

const emailServices = new EmailServices();
export default emailServices;
