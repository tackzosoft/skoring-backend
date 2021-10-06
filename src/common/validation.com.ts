import { Joi } from "celebrate";

export default {
    user: {
        email: Joi.string().trim().email(),
        mobile_no: Joi.string().trim(),
        password: Joi.string().min(6).max(32),
        username: Joi.string().trim()
    },
    address: {
        address_id: Joi.string().trim(),
        address: Joi.string().trim(),
        city: Joi.string().trim(),
        block: Joi.string().trim(),
        country: Joi.string().trim(),
        states: Joi.string().trim(),
        date_created: Joi.string().trim()
    },
    student: {
        user_id: Joi.string().trim(),
        profile_image: Joi.string().allow(""),
        profile_type: Joi.string().trim(),
        date_created: Joi.string().trim(),
        gender: Joi.string().trim(),
        DOB: Joi.date(),
        first_name: Joi.string().trim(),
        last_name: Joi.string().trim(),
        email: Joi.string().trim(),
        mobile: Joi.string().trim(),
        password: Joi.string().trim(),
        parent_mobile: Joi.string().trim()
    },

    teacher: {
        password: Joi.string().trim(),
        user_id: Joi.string().trim(),
        profile_image: Joi.string().allow(""),
        profile_type: Joi.string().trim(),
        qualification: Joi.string().trim(),
        gender: Joi.string().trim(),
        DOB: Joi.string().trim(),
        first_name: Joi.string().trim(),
        last_name: Joi.string().trim(),
        email: Joi.string().trim(),
        mobile: Joi.string().trim(),
    },

    create: {
        class: Joi.string().trim(),
        subject: Joi.string().trim(),
    },
    join: {
        unique_code: Joi.string().trim(),
        class_id:Joi.string().trim(),
    },
    accept: {
        req_id:Joi.string().trim(),
        active: Joi.number(),
        unique_code:Joi.string().trim(),
        approved: Joi.number(),
    },

    user_master: {
        user_id: Joi.string().trim(),

        active: Joi.string().trim(),
        approved: Joi.string().trim(),
        device_type: Joi.string().trim(),
        device_id: Joi.string().trim(),
        date_created: Joi.string().trim(),
        date_modified: Joi.string().trim(),
        user_type: Joi.string().trim()
    },

}


