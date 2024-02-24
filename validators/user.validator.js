const Joi = require('joi');

const { regexp, userRolesEnum } = require('../../constants');


module.exports = {
  createUser: Joi.object().keys({
    name: Joi.string().required().min(3).max(30).regex(regexp.NAME_REGEXP),
    surname: Joi.string().required().min(3).max(50),
    email: Joi.string().regex(regexp.EMAIL_REGEXP),
    password: Joi.string().min(8).max(256).required(),
    role: Joi.string().allow(...Object.values(userRolesEnum))
  })
};