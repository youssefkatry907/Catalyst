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
                    "string.base": "validName",
                    "any.required": "requiredName",
                    "string.empty": "emptyName",
                }),
            email: joi.string().optional().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'eg', 'io'] } }).empty().optional().messages({
                "string.email": "validEmail",
                "string.empty": "emptyEmail"
            }),
            phoneNumber: joi.number().empty().optional().messages({
                "number.base": "validPhone",
                "number.empty": "emptyPhone"
            }),
            password: joi.string().empty().required()
                .messages({
                    "string.base": "validPassword",
                    "any.required": "requiredPassword",
                    "string.empty": "emptyPassword",
                })
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