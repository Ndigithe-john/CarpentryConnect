const joi = require("joi");

const createUserSchema = joi
  .object({
    FirstName: joi.string().required(),
    LastName: joi.string().required(),
    Email: joi.string().required(),
    PhoneNumber: joi.number().required(),
    Role: joi.string().required(),
    PasswordHash: joi.string().required().min(6).max(20),
    Confirm_password: joi.ref("PasswordHash"),
    QualificationLevel: joi.when("Role", {
      is: "Carpenter",
      then: joi.string().required(),
    }),
    DocumentPath: joi.when("Role", {
      is: "Carpenter",
      then: joi.string().required(),
    }),
    WorkshopName: joi.when("Role", {
      is: "WorkshopOwner",
      then: joi.string().required(),
    }),
    WorkshopLocation: joi.when("Role", {
      is: "WorkshopOwner",
      then: joi.string().required(),
    }),
  })
  .options({ abortEarly: false });

module.exports = { createUserSchema };
