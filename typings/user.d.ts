export as namespace IUser;

import { Model } from "sequelize";

interface UserData {
  user_id: string,
  email: string,
  mobile_no: string,
  company_name: string
}

interface UserId extends Model {

}

interface UserAddress extends Model {

}

interface UserLog extends Model {

}

export namespace Request {
  interface RegisterUser {
    email: string,
    mobile_no: string,
    password: string,
    company_name: string,
    username: string
  }

  interface LoginUser {
    email: string,
    password: string,
    mobile_no?: string
  }

  interface ForgotPassword {
    email: string
  }

  interface ChangePassword {
    old_password: string,
    new_password: string
  }

  interface VerifyLoginOTP {
    user_id: string,
    otp_key: string
  }

  interface checkUsernameAvailability {
    username?: string
  }

  interface VerifyActivationKey {
    activation_key?: string
  }

  interface ResetPasswordKey {
    secret_key: string,
    otp_key: string,
    password: string,
    email_id: string
  }

  interface forget_password_validation {
    secret_key: string,
    otp_key: string,
    password: string,
    email_id: string
  }

  interface saveAddress {
    user_id: string,
    address1: string,
    address2: string,
    address3: string,
    city: string,
    state: string
    postal_code: string,
    country: string,
    status: string,
    default_address: string,
    address_type: string


  }

  interface showAddress {
    user_id: string

  }


  interface updateAddress {
    user_id: string,
    address1: string,
    address2: string,
    address3: string,
    city: string,
    state: string
    postal_code: string,
    country: string,
    status: string,
    default_address: string,
    address_type: string

  }

  interface Student_profileModule {
    profile_image: string,
    class: string,
    gender: string,
    DOB: Date,
    first_name: string,
    last_name: string,
    email: string,
    mobile: string,
    password: string,
    parent_mobile: string,
  }

  interface Teacher_profileModule {
    profile_image: string,
    qualification: string,
    gender: string,
    DOB: Date,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    mobile: string,
  }

  interface User_masterModule {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    mobile: string,
    profile_image: string
    password: string,
    active: number,
    approved: number,
    device_type: string,
    device_id: string,
    date_created: Date,
    date_modified: Date,
    user_type: number
  }

  interface Create_classModule {
    class: string,
    subject: string,
    class_id: string
  }

  interface Join_classModule {
    unique_code: number,
    status: number
  }
  interface add_studeent {
    class_id: string,
    student_id: string,
    attendence_date: Date,
    students: Array<[]>
  }
  interface assigment {
    class_id: string,
    student_id: string,
    dead_line: Date,
    assigment: Array<[]>,
    assigment_type: string,
    assigment_file: string
  }
  interface add_chapter {
    class_id: string,
    chapters: Array<[]>
    chapter_name: string,
    month: number,
    start_date: Date,
    end_date: Date
  }

  interface submit_assigment {
    assigment_id: string,
    assignment: Array<[]>
    // student_id: string,
    file: string
    // month: number,
    // start_date: Date,
    // end_date: Date
  }

  interface add_topic {
    class_id: string,
    chp_id: string,
    topics: Array<{ topic_name: string }>
    topic_id: string,
    topic_name: string,

  }

  interface edit_topic {
    chp_id: string,
    topic_id: string,
    topic_name: string,
    start_date: Date,
    end_date: Date
  }


  interface Get_requests {
    class_id: string
  }

  interface remove_students {
    student_id: string
  }

  interface Accept_requestModule {
    active: number,
    approved: number,
    req_id: string,
    unique_code: number
  }
}