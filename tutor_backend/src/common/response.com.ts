export const success = {
  default: { httpCode: 200, statusCode: 200, message: "Success" },
  accepted:{ httpCode: 200, statusCode: 200, message: "Request_accepted" },
  requested:{ httpCode: 200, statusCode: 200, message: "Request_sent" },
};

export const error = {
  user: {
    user_not_register: {httpCode: 400, statusCode: 401, message: "something went wrong try again"},
    user_already : {httpCode : 400,statusCode : 402,message : "User already exist"},
    user_not_found : {httpCode : 400,statusCode:403,message : "user not found"},
    credential_not_match:{httpCode : 400,statusCode:404,message : "Email and password not match"}
  },

};
