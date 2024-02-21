const AppError = require("../utils/appError");
const {
  newItemValidator,
  newCapenterItemValidator,
} = require("../validators/newItemValidator");
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
async function getAllItems(req, res, next) {
  try {
    const { pool } = req;
    if (pool.connected) {
      let results = await pool.request().execute("GetAllWorkshopItems");
      res.status(200).json({
        status: "success",
        message: "all items fetched successfully",
        data: results.recordsets[0],
      });
    } else {
      res.status(201).json({
        status: false,
        message: "error trying to fetch the items. Please try again later",
      });
    }
  } catch (error) {
    return next(new AppError("Server Error", 500));
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

async function deleteWorkshopItem(req, res, next) {
  try {
    const delete_body = req.body;
    const { ItemID } = delete_body;
    const user = req.user;
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
      const delete_item = await pool
        .request()
        .input("ItemID", ItemID)
        .execute("DeleteWorkshopItem");

      res.status(200).json({
        status: "success",
        message: "item deleted successully",
      });
    } else {
      res.status(201).json({
        status: false,
        message: "Error deleting post",
      });
    }
  } catch (error) {
    return next(
      new AppError("Unable to process your request at the moment", 500)
    );
  }
}
async function carpenterPostItem(req, res, next) {
  try {
    console.log("here we go");
    const item_body = req.body;
    const { ImageURL, Description, Category, Material } = item_body;
    const { value } = newCapenterItemValidator(item_body);
    console.log(value);
    const { pool } = req;
    const user = req.user;
    if (pool.connected) {
      let carpenter_post = await pool
        .request()
        .input("CarpenterID", user.UserID)
        .input("ImageURL", ImageURL)
        .input("Description", Description)
        .input("Category", Category)
        .input("Material", Material)
        .execute("CarpenterPost");
      res.status(200).json({
        status: "success",
        message: "Post Created Successfully",
        results: carpenter_post,
      });
    } else {
      return next(new AppError("There is a problem updating the item", 401));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
}

module.exports = {
  carpenterPostItem,
  postItem,
  getPendingItems,
  updateWorkshopItemStatus,
  deleteWorkshopItem,
  getAllItems,
};
