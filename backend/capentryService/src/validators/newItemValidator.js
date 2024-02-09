const { newItemSchema } = require("../model/newItemModal");

function newItemValidator(body) {
  const create_item = newItemSchema.validate(body, { abortEarly: false });
  if (create_item.error?.details.length) {
    let message = create_item.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else {
    return create_item;
  }
}
module.exports = newItemValidator;
