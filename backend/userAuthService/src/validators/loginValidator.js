const { loginSchema } = require("../model/loginUser");

function loginUserValidator(body) {
  const userSchema = loginSchema.validate(body, { abortEarly: false });
  if (userSchema.error?.details.length) {
    let message = userSchema.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else return userSchema;
}

module.exports = loginUserValidator;
