var Joi = require('joi');

module.exports.registerSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});
