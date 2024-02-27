const { getUserSchema, update_schema } = require("../model/getuser");

function getUserValidator(body) {
  const userSchema = getUserSchema.validate(body, { abortEarly: false });
  if (userSchema.error?.details.length) {
    let message = userSchema.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else return userSchema;
}

function updateProfileValidator(body) {
  const updateSchema = update_schema.validate(body, { abortEarly: false });
  if (updateSchema.error?.details?.length) {
    let message = updateSchema.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else return updateSchema;
}

module.exports = { getUserValidator, updateProfileValidator };
