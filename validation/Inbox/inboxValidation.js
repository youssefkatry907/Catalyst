let joi = require('joi');

module.exports = {
    contactUsValidation: {
        body: joi.object().required().keys({
            userId: joi.string().required().messages({
                "string.base": "please enter a valid userId",
                "string.empty": "userId is required",
                "any.required": "userId can not be empty"
            }),

            message: joi.string().required().messages({
                "string.base": "please enter a message",
                "string.empty": "message is required",
                "any.required": "message can not be empty"
            }),
        })
    }
}