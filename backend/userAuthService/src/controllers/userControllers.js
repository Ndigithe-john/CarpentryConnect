const AppError = require("../utils/appError");
const createUserValidator = require("../validators/newUserValidator");
const bcrypt = require("bcrypt");

async function signUp(req, res) {
  try {
    let newUser = req.body;
    const { pool } = req;
    const { value } = createUserValidator(newUser);
    console.log(value);

    let {
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Role,
      QualificationLevel,
      DocumentPath,
      WorkshopName,
      WorkshopLocation,
      PasswordHash,
    } = newUser;
    let hashed_password = await bcrypt.hash(PasswordHash, 8);
    if (pool.connected) {
      let results = await pool
        .request()
        .input("FirstName", FirstName)
        .input("LastName", LastName)
        .input("Email", Email)
        .input("PhoneNumber", PhoneNumber)
        .input("Role", Role)
        .input("QualificationLevel", QualificationLevel)
        .input("DocumentPath", DocumentPath)
        .input("WorkshopName", WorkshopName)
        .input("WorkshopLocation", WorkshopLocation)
        .input("PasswordHash", hashed_password)
        .execute("CreateUser");

      res.json({
        success: true,
        results: "New user created",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
}
module.exports = signUp;
