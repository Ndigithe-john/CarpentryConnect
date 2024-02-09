const AppError = require("../utils/appError");
const newItemValidator = require("../validators/newItemValidator");
async function postItem(req, res, next) {
  try {
    const user = req.user;
    const { ImageURL, Description, Category, Material, DateRequired, Price } =
      req.body;
    const { value } = newItemValidator(body);
    console.log(value);
    const { pool } = req;
    if (pool.connected) {
      let new_posts = await pool
        .request()
        .input("UserID", user.UserID)
        .input("ImageURL", ImageURL)
        .input("Description", Description)
        .input("Category", Category)
        .input("Material", Material)
        .input("DateRequired", DateRequired)
        .input("Price", Price)
        .execute(" AddWorkshopItem");

      res.status(200).json({
        status: "success",
        message: "Post Created Successfully",
      });
    } else {
      return next(new AppError("There is a problem updating the item", 401));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = postItem;
