let joi = require('joi');

module.exports = {
    addItemValidation: {
        body: joi.object().required().keys({
            userId: joi.string().required().messages({
                "string.base": "please enter a valid userId",
                "string.empty": "userId is required",
                "any.required": "userId can not be empty"
            }),

            name: joi.string().required().messages({
                "string.base": "please enter a valid name",
                "string.empty": "name is required",
                "any.required": "name can not be empty"
            }),

            price: joi.number().optional().messages({
                "number.base": "please enter a valid price"
            }),

            weight: joi.number().optional().messages({
                "number.base": "please enter a valid weight"
            }),

            palladium: joi.number().required().messages({
                "number.base": "please enter a valid palladium price",
                "number.empty": "palladium price is required",
                "any.required": "palladium price can not be empty"
            }),

            platinum: joi.number().required().messages({
                "number.base": "please enter a valid platinum price",
                "number.empty": "platinum price is required",
                "any.required": "platinum price can not be empty"
            }),

            rhodium: joi.number().required().messages({
                "number.base": "please enter a valid rhodium price",
                "number.empty": "rhodium price is required",
                "any.required": "rhodium price can not be empty"
            }),

            brand: joi.string().optional().messages({
                "string.base": "please enter a valid brand"
            }),

            product: joi.string().optional().messages({
                "string.base": "please enter a valid product"
            }),

            catalyticProduct: joi.string().optional().messages({
                "string.base": "please enter a valid catalyticProduct"
            }),

            isHyprid: joi.string().optional().messages({
                "string.base": "please enter a valid isHyprid"
            }),

            type: joi.string().optional().messages({
                "string.base": "please enter a valid type"
            }),

            manufacturer: joi.string().optional().messages({
                "string.base": "please enter a valid manufacturer"
            }),

            details: joi.string().optional().messages({
                "string.base": "please enter a valid details"
            }),

            image: joi.object().optional().keys({
                url: joi.string().optional().messages({
                    "string.base": "please enter a valid url",
                }),
                public_id: joi.string().optional().messages({
                    "string.base": "please enter a valid public_id",
                })
            }),

        })
    }
}