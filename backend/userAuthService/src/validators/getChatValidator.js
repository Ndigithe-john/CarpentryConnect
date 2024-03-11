const { getchatSchema } = require("../model/getChatSchema");

function getChatValidator(body) {
  const chat_schema_body = getchatSchema.validate(body, { abortEarly: false });
  if (chat_schema_body.error?.details.length) {
    const message = chat_schema_body.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else return chat_schema_body;
}

module.exports = getChatValidator;
