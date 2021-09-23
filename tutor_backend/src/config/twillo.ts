import { Twilio } from "twilio";


const accountSid = "AC759b22ba1f1e1a1ec3283ba6f3acf3cd";
const authToken = "62c6460221da9223ce0a137cc270ef4e";

const client = new Twilio(accountSid,authToken);


export default client;