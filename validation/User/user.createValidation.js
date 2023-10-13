let joi = require('joi');

module.exports = {
    loginValidation: {
        body: joi.object().required().keys({

            email: joi.string().optional().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'eg', 'io'] } }).empty().optional().messages({
                "string.email": "validEmail",
                "string.empty": "emptyEmail"
            }),
            phoneNumber: joi.string().empty().optional().messages({
                "string.base": "validPhone",
                "string.empty": "emptyPhone"
            }),


            password: joi.string().empty().required()
                .messages({
                    "string.base": "validPassword",
                    "any.required": "requiredPassword",
                    "string.empty": "emptyPassword",
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
        })
    },

    sendEmailValidation: {
        body: joi.object().required().keys({
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'eg', 'io'] } }).empty().required().messages({
                "string.email": "validEmail",
                "string.empty": "emptyEmail"
            }),
        })
    },
}