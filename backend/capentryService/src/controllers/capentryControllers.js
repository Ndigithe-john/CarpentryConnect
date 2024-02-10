const AppError = require("../utils/appError");
const newItemValidator = require("../validators/newItemValidator");
async function postItem(req, res, next) {
  try {
    const item_body = req.body;
    const user = req.user;
    const { ImageURL, Description, Category, Material, DateRequired, Price } =
      item_body;
    const { value } = newItemValidator(item_body);
    console.log(value);
    const { pool } = req;
    if (pool.connected) {
      let new_posts = await pool
        .request()
        .input("WorkshopOwnerID", user.UserID)
        .input("ImageURL", ImageURL)
        .input("Description", Description)
        .input("Category", Category)
        .input("Material", Material)
        .input("DateRequired", DateRequired)
        .input("Price", Price)
        .execute("AddWorkshopItem");

      res.status(200).json({
        status: "success",
        message: "Post Created Successfully",
        results: new_posts,
      });
    } else {
      return next(new AppError("There is a problem updating the item", 401));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getPendingItems(req, res, next) {
  try {
    const { pool } = req;
    if (pool.connected) {
      let results = await pool.request().execute("GetPendingItems");
      res.status(200).json({
        status: "success",
        message: "data fetched successfully",
        data: results.recordsets[0],
      });
    }
  } catch (error) {
    return next(new AppError("There is a problem with the server", 500));
  }
}
async function updateWorkshopItemStatus(req, res, next) {
  try {
    const user = req.user;
    const { ItemID, NewStatus } = req.body;
    const { pool } = req;
    if (pool.connected) {
      const checkPostQuery = `
          SELECT ItemID
          FROM WorkshopItems
          WHERE ItemID = ${ItemID} and WorkshopOwnerID=${user.UserID}
        `;
      const checkPostResult = await pool
        .request()
        .input("ItemID", ItemID)
        .query(checkPostQuery);

      if (checkPostResult.recordset.length === 0) {
        return next(new AppError("Post not found"), 404);
      }
      let update = await pool
        .request()
        .input("ItemID", ItemID)
        .input("NewStatus", NewStatus)
        .execute("UpdateWorkshopItemStatus");
      res.status(200).json({
        status: "success",
        message: "Item status updated successfully",
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Error updating state",
      });
    }
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
}

module.exports = { postItem, getPendingItems, updateWorkshopItemStatus };
