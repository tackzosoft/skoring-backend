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
    subject: string
  }

  interface Join_classModule {
    unique_code: number,
    class_id:string
  }

  interface Get_requests {
    class_id:string
  }

  interface Accept_requestModule {
    active: number,
    approved: number,
    req_id:string,
    unique_code:number
  }
}