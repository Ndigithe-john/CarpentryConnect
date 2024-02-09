// const getUserValidator = require("../validators/getUserValidator");
async function User(pool, Email) {
  // const { pool } = req;
  // const { Email } = req.body;
  // const { value } = getUserValidator(req.body);
  if (pool.connected) {
    let results = await pool
      .request()
      .input("Email", Email)
      .execute("GetUserByEmail");
    const user = results.recordset[0];
    // res.json({
    //   user: user,
    // });
    return user;
  }
}

module.exports = User;
