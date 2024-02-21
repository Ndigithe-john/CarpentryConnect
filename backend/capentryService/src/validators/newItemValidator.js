const { newItemSchema, capenterItemSchema } = require("../model/newItemModal");

function newItemValidator(body) {
  const create_item = newItemSchema.validate(body, { abortEarly: false });
  if (create_item.error?.details.length) {
    let message = create_item.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else {
    return create_item;
  }
}

function newCapenterItemValidator(body) {
  const new_item_body = capenterItemSchema.validate(body, {
    abortEarly: false,
  });
  if (new_item_body.error?.details.length) {
    let message = new_item_body.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else return new_item_body;
}
module.exports = { newItemValidator, newCapenterItemValidator };
