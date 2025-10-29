const joi = require('joi');

module.exports.listingSchema = joi.object({
        listing: joi.object({
        title: joi.string().required(),
        image: joi.object({
            url: joi.string().uri().required()
        }).optional(),  // Optional since image is not required in your form
        description: joi.string().required(),
        price: joi.number().min(0).required(),
        location: joi.string().required(),
        country: joi.string().required()
    }).required()
});

module.exports.reviewSchema = joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required(),
})
