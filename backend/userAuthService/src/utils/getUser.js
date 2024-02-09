// const getUserValidator = require("../validators/getUserValidator");
async function User(Email, pool) {
  // const { pool } = req;
  // const { Email } = req.body;
  // const { value } = getUserValidator(req.body);
  if (pool.connected) {
    console.log("Getting here");
    let results = await pool
      .request()
      .input("Email", Email)
      .execute("GetUserByEmail");
    let user = results.recordset[0];

    // res.json({
    //   user: user,
    // });
    return user;
  }
}

module.exports = User;
