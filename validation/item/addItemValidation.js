let joi = require('joi');

module.exports = {
    addItemValidation: {
        body: joi.object().required().keys({

            name: joi.string().required().messages({
                "string.base": "please enter a valid name",
                "string.empty": "name is required",
                "any.required": "name can not be empty"
            }),

            price: joi.number().required().messages({
                "number.base": "please enter a valid price",
                "number.empty": "price is required",
                "any.required": "price can not be empty"
            }),

            weight: joi.number().required().messages({
                "number.base": "please enter a valid weight",
                "number.empty": "weight is required",
                "any.required": "weight can not be empty"
            }),

            type: joi.string().required().messages({
                "string.base": "please enter a valid type",
                "string.empty": "type is required",
                "any.required": "type can not be empty"
            })

        })
    }
}