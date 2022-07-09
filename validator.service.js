const Joi = require("joi");

// Validate a user
const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(user);
}

module.exports = validateUser;
