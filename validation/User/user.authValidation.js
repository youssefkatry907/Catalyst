let joi = require('joi');

module.exports = {
    loginValidation: {
        body: joi.object().required().keys({

            email: joi.string().optional().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'eg', 'io'] } }).empty().optional().messages({
                "string.email": "please enter a valid email",
                "any.required": "email must be entered",
                "string.empty": "email can not be empty"
            }),
            phoneNumber: joi.string().empty().optional().messages({
                "string.base": "please enter a valid phone number",
                "any.required": "phone number must be entered",
                "string.empty": "phone number can not be empty"
            }),


            password: joi.string().empty().min(8).required()
                .messages({
                    "string.base": "please enter a valid password",
                    "any.required": "password must be entered",
                    "string.empty": "password cannot be empty",
                    "string.min": "password must be at least 8 characters"
                })
        })
    },

    registerValidation: {
        body: joi.object().required().keys({
            name: joi.string().empty().required()
                .messages({
                    "string.base": "please enter a valid name",
                    "any.required": "name is required",
                    "string.empty": "name can not be empty",
                }),
            email: joi.string().optional().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'eg', 'io'] } }).empty().optional().messages({
                "string.email": "please enter a valid email",
                "string.empty": "email can not be empty",
            }),
            phoneNumber: joi.number().empty().optional().messages({
                "number.base": "please enter a valid phone number",
                "number.empty": "phone number can not be empty",
            }),
            password: joi.string().empty().required().messages({
                "string.base": "please enter a valid password",
                "any.required": "password is required",
                "string.empty": "password can not be empty",
            }),
            country: joi.string().empty().optional().messages({
                "string.base": "please enter a valid country",
                "string.empty": "country can not be empty",
            }),
            type: joi.string().empty().required().messages({
                "string.base": "please enter a valid type",
                "any.required": "type is required",
                "string.empty": "type can not be empty",
            }), 
            companyName: joi.string().empty().optional().messages({
                "string.base": "please enter a valid companyName",
                "string.empty": "company name can not be empty",
            }),
            appDiscount: joi.number().empty().optional().messages({
                "number.base": "please enter a valid app discount",
                "number.empty": "App discount can not be empty",
            }),
            countryDiscount: joi.number().empty().optional().messages({
                "number.base": "please enter a valid country discount",
                "number.empty": "country discount can not be empty",
            }),
            hiddenDiscount: joi.number().empty().optional().messages({
                "number.base": "please enter a valid hidden discount",
                "number.empty": "hidden discount can not be empty",
            }),
            plan: joi.object().empty().optional().messages({
                "object.base": "please select a valid plan",
                "object.empty": "plan can not be empty",
            }),
        })
    },

    resetPasswordValidation: {
        body: joi.object().required().keys({

            currentPassword: joi.string().empty().required().min(8).messages({
                "string.base": "please enter a valid password",
                "any.required": "password must be entered",
                "string.empty": "password cannot be empty",
                "string.min": "password must be at least 8 characters"
            }),

            newPassword: joi.string().empty().required().min(8).messages({
                "string.base": "please enter a valid password",
                "any.required": "password must be entered",
                "string.empty": "password cannot be empty",
                "string.min": "password must be at least 8 characters"
            }),

            confirmPassword: joi.string().empty().required().min(8).messages({
                "string.base": "please enter a valid password",
                "any.required": "password must be entered",
                "string.empty": "password cannot be empty",
                "string.min": "password must be at least 8 characters"
            }),
            
        })
    },

    sendEmailValidation: {
        body: joi.object().required().keys({
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'eg', 'io'] } }).empty().required().messages({
                "string.email": "please enter a valid email",
                "string.empty": "email can not be empty",
            }),
        })
    },
}