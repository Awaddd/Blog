const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi) 

module.exports = {
  validateUser(user) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2})
        .required(),
      firstName: Joi.string()
        .min(2)
        .required(),
      lastName: Joi.string()
        .min(2)
        .required(),
  
      password: Joi.string()
        .min(7)
        .required(),
  
        isAdmin: Joi.boolean()
    });
  
    return schema.validate(user);
  },

  validateLogin(user) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2})
        .required(),
      password: Joi.string()
        .required()
    });
  
    return schema.validate(user);
  },

  validatePost(post) {
  
    const schema = Joi.object({
      category: Joi.objectId()
        .required(),
      title: Joi.string()
        .min(7)
        .required(),
      summary: Joi.string()
        .min(5)
        .max(100)
        .required(),
      content: Joi.string()
        // .min(100)
        .required(),
      tags: Joi.array()
    });

    return schema.validate(post);
  }
  
}