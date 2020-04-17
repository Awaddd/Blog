const Joi = require('@hapi/joi');

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
        .required()
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