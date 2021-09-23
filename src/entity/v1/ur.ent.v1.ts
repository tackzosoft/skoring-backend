// import { Op } from "sequelize";
// import { ENUM } from "../../common";
// import BaseEntity from "../base.ent";
// import { helper } from "../../services";
// import UserDataModel from "../../models/userData.mod";
// import UserIdModel from "../../models/userId.mod";
// import {UserAddressModel} from "../../models/userAddress.mod"

// class UserEntity extends BaseEntity {

//   /**
//    * checks if user exists using phone number or email
//    * @param payload - email/mobile_no
//    */
//   async checkUserByEmailOrPhone(payload: any): Promise<IApp.Entity> {
//     let whereCondition = {};
//     if (payload.email && payload.mobile_no) {
//       whereCondition = {
//         [Op.or]: [{ email: payload.email }, { mobile_no: payload.mobile_no }]
//       }
//     }
//     else {
//       if (payload.email) whereCondition = { email: payload.email };
//       if (payload.mobile_no) whereCondition = { mobile_no: payload.mobile_no };
//     }
//     let userData = await UserDataModel.findOne({ subQuery: false, where: whereCondition });
//     if (userData) return { success: true, data: userData.toJSON() };
//     else return { success: false };
//   }

//   /**
//    * get user data from users_id collection
//    * @param user_id
//    */
//   async getUserIdDataById(user_id: string): Promise<IApp.Entity> {
//     let userIdData = await UserIdModel.findOne({ where: { user_id } });
//     if (userIdData) return { success: true, data: userIdData.toJSON() };
//     else return { success: false }
//   }

//   /**
//    * get user data from users_id collection by some condition
//    * @param condition
//    */
//   async getUserData(user_id: any): Promise<IApp.Entity> {
//     let userIdData = await UserDataModel.findOne({ where: {user_id} });
//     if (userIdData) return { success: true, data: userIdData.toJSON() };
//     else return { success: false }
//   }


//     /**
//    * get user data from users_data collection by some condition
//    * @param condition
//    */
//   async getUserIdData(condition: any): Promise<IApp.Entity> {
//     let userIdData = await UserIdModel.findOne({ where: condition });
//     if (userIdData) return { success: true, data: userIdData.toJSON() };
//     else return { success: false }
//   }

//   /**
//    * creates user on the users_id and users_data collection
//    * @param payload
//    */
//   async createUser(payload: any): Promise<IApp.Entity> {
//     let userId = helper.generateRandom('user_id'),
//       password_salt = helper.generateRandom('salt');
//     let createUserId = await UserIdModel.create(
//       {
//         user_id: userId,
//         password: helper.generateHash(payload.password, password_salt),
//         user_role: '1',
//         status: ENUM.USER.STATUS.INACTIVE,
//         password_salt: password_salt,
//         username:payload.username,
//         activation_key: helper.generateRandom('user_activation')
//       }
//     );
//     if (createUserId) {
//       let createUserData = await UserDataModel.create(
//         {
//           user_id: userId,
//           email: payload.email,
//           mobile_no: payload.mobile_no,
//           company_name:payload.company_name
         
//         }
//       );
//       if (createUserData) {
//         return { success: true, data: createUserData.toJSON() }
//       } else return { success: false }
//     } else return { success: false }
//   }

//   /**
//    * get user data from users_id collection
//    * @param user_id
//    */
//   async updateUserIdData(user_id: string, payload: any): Promise<any> {
//     let userIdData = await UserIdModel.update(payload, { where: { user_id } });
//     console.log(userIdData);
//     // if (userIdData) return { success: true, data: userIdData.toJSON() };
//     // else return { success: false }
//   }


//   /**
//    * 
//    */
//   async saveAddress(payload:any, user_data : any):Promise<any>{
//     console.log(user_data)
//     let save_address = await UserAddressModel.create(
//       {
//         user_id : user_data.user_id,
//         name : user_data.first_name,
//         email : user_data.email,
//         phone_no : user_data.mobile_no,
//         address1 :payload.address1,
//         address2 : payload.address2,
//         address3 : payload.address3,
//         city : payload.city,
//         state :payload.state,
//         postal_code : payload.postal_code,
//         country : payload.country,
//         status : payload.status,
//         default_address: payload.default_address,
//         address_type : payload.address_type,
//         created_by : payload.user_id,
//         modified_by : payload.user_id

//       })
      
//       if (save_address) {
//         return { success: true, data: save_address }
//       } else return { success: false }

//   }

//   async showAddress(user_id : any):Promise<any>{

//     let addressData = await UserAddressModel.findOne({ where: {user_id} });
//     console.log(addressData)
//     if (addressData) return { success: true, data: addressData };
//     else return { success: false }
//   }

//   async updateAddress(payload : any , user_data:any):Promise<any>{
//     var user_id = user_data.user_id
//     let update_address = await UserAddressModel.update(payload ,{ where : {user_id}})
//     if(update_address){
//       return { success: true, data: update_address }
//     }else{
//      return {success: false}
//     }


//   }


//   /**
//    * 
//    */
//   async change_password(payload : any,user_data:any):Promise<any>{
   
//     var user_id = user_data.data.user_id
//     var password_salt = helper.generateRandom('salt');
//     var password =helper.generateHash(payload.new_password, password_salt)
//     var update_password_and_salt = await UserIdModel.update({password:password ,password_salt:password_salt},{ where : {user_id:user_id}})
//     if(update_password_and_salt){
//       return {success :true}
//     }else{

//     }

//   }
  
  

// }



// export default new UserEntity();