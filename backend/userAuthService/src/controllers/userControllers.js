const AppError = require("../utils/appError");
const createUserValidator = require("../validators/newUserValidator");
const bcrypt = require("bcrypt");
const User = require("../utils/getUser");
const loginUserValidator = require("../validators/loginValidator");

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

async function login(req, res, next) {
  try {
    const login_body = req.body;
    const { value } = loginUserValidator(login_body);
    console.log(value);
    const { pool } = req;
    const { Email, Password } = login_body;
    let user = await User(Email, pool);
    console.log(user);
    if (user) {
      let password_match = await bcrypt.compare(Password, user.PasswordHash);
      if (password_match) {
        req.session.authorized = true;
        req.session.user = user;
        res.json({
          status: "success",
          message: "logged in successfully",
        });
      } else {
        return next(new AppError("Incorrect Email or Password", 401));
      }

      if (!Email || !Password) {
        return next(
          new AppError("Please provide both email and password"),
          400
        );
      }

      if (!user) {
        return next(new AppError("Incorrect email or password"), 401);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
}
module.exports = { signUp, login };
