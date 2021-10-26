export const success = {
  default: { httpCode: 200, statusCode: 200, message: "Success" },
  accepted: { httpCode: 200, statusCode: 200, message: "Request_accepted" },
  already_accepted: { httpCode: 200, statusCode: 200, message: "Request_accepted already" },
  rejected: { httpCode: 200, statusCode: 200, message: "Request_rejected" },
  requested: { httpCode: 200, statusCode: 200, message: "Request_sent" },
  removed: { httpCode: 200, statusCode: 200, message: "student removed" },
};

export const error = {
  user: {
    user_not_register: { httpCode: 400, statusCode: 401, message: "something went wrong try again" },
    user_already: { httpCode: 400, statusCode: 402, message: "User already exist" },
    email_already: { httpCode: 400, statusCode: 402, message: "email already exist" },
    phone_number_already: { httpCode: 400, statusCode: 402, message: "phone_number already exist" },
    student_already: { httpCode: 400, statusCode: 402, message: "request accepted && Student already exist" },
    student_already_invited: { httpCode: 400, statusCode: 402, message: "student_already_invited" },
    removed_already: { httpCode: 400, statusCode: 402, message: "student_already removed" },
    request_already: { httpCode: 400, statusCode: 402, message: "request already send" },
    user_not_found: { httpCode: 400, statusCode: 403, message: "user not found" },
    credential_not_match: { httpCode: 400, statusCode: 404, message: "Email and password not match" },
    credential_not_matched: { httpCode: 400, statusCode: 404, message: "unique_code and class_id not match" },
    own_class: { httpCode: 400, statusCode: 404, message: "you cannot join your own class" }
  },

};
