let joi = require('joi');

module.exports = {

    createListValidation: {
        body: joi.object().required().keys({

            listName: joi.string().required().messages({
                "string.base": "please enter a valid listName",
                "string.empty": "listName is required",
                "any.required": "listName can not be empty"
            }),

            listOfItems: joi.array().items(joi.object().keys({
                _id: joi.string().required().messages({
                    "string.base": "please enter a valid _id",
                    "string.empty": "_id is required",
                    "any.required": "_id can not be empty"
                })
            })),

            numOfItems: joi.number().optional().messages({
                "number.base": "please enter a valid number of items"
            }),

            totalPrice: joi.number().optional().messages({
                "number.base": "please enter a valid total Price"
            })

        })
    }

    // addItemToListValidation: {
    //     body: joi.object().required().keys({

    //         listId: joi.string().required().messages({
    //             "string.base": "please enter a valid listId",
    //             "string.empty": "listId is required",
    //             "any.required": "listId can not be empty"
    //         }),

    //         itemId: joi.string().required().messages({
    //             "string.base": "please enter a valid itemId",
    //             "string.empty": "itemId is required",
    //             "any.required": "itemId can not be empty"
    //         })

    //     })
    // },

    // removeItemFromListValidation: {
    //     body: joi.object().required().keys({

    //         listId: joi.string().required().messages({
    //             "string.base": "please enter a valid listId",
    //             "string.empty": "listId is required",
    //             "any.required": "listId can not be empty"
    //         }),

    //         itemId: joi.string().required().messages({
    //             "string.base": "please enter a valid itemId",
    //             "string.empty": "itemId is required",
    //             "any.required": "itemId can not be empty"
    //         })

    //     })
    // },

    // deleteListValidation: {
    //     body: joi.object().required().keys({

    //         listId: joi.string().required().messages({
    //             "string.base": "please enter a valid listId",
    //             "string.empty": "listId is required",
    //             "any.required": "listId can not be empty"
    //         })
    //     })
    // },

}