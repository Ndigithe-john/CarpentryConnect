const getUserValidator = require("../validators/getUserValidator");
async function user(req, res) {
  const { pool } = req;
  const { Email } = req.body;
  const { value } = getUserValidator(req.body);
  if (pool.connected) {
    let results = await pool
      .request()
      .input("Email", Email)
      .execute("GetUserByEmail");
    const user = results.recordset;
    res.json({
      user: user,
    });
    return user;
  }
}

module.exports = user;
