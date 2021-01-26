const Joi = require("@hapi/joi");
//Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const validation = schema.validate(data);
  return validation;
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().exist().required(),
  });
  const validation = schema.validate(data);
  return validation;
};
//Status and Skills validation
const statSkillValidation = (data) => {
  const schema = Joi.object({
    status: Joi.string().required(),
    skills: Joi.string().required(),
  }).unknown(true);
  const validation = schema.validate(data);
  return validation;
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.statSkillValidation = statSkillValidation;
