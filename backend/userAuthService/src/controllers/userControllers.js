const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");

async function signUp(req, res) {
  try {
    let newUser = req.body;
    const { pool } = req;

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
    // let hashed_password = await bcrypt.hash(PasswordHash, 8);
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
        .input("PasswordHash", PasswordHash)
        .execute("CreateUser");

      res.json({
        success: true,
        results: "New user created",
      });
    }
    res.json({
      success: false,
      message: "an error occured",
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = signUp;
