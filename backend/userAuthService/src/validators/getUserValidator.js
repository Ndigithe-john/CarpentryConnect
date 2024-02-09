const { getUserSchema } = require("../model/getuser");

function getUserValidator(body) {
  const userSchema = getUserSchema.validate(body, { abortEarly: false });
  if (userSchema.error?.details.length) {
    let message = userSchema.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else return userSchema;
}

module.exports = getUserValidator;
