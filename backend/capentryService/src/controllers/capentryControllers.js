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

async function deleteItems(req, res, next) {
  try {
    const delete_body = req.body;
    const { ItemID } = delete_body;
    const user = req.user;
    const { pool } = req;

    if (pool.connected) {
      let ItemType;
      let checkPostQuery;
      console.log(user.id);
      if (user.role === "WorkshopOwner") {
        ItemType = "Workshop";
        checkPostQuery = `
        SELECT ItemID
        FROM ${ItemType}Items
        WHERE ItemID = @ItemID AND ${ItemType}OwnerID = @UserID;
      `;
      } else if (user.role === "Carpenter") {
        ItemType = "Carpenter";
        checkPostQuery = `
        SELECT ItemID
        FROM ${ItemType}sItems
        WHERE ItemID = @ItemID AND ${ItemType}ID = @UserID;
      `;
      } else {
        return res.status(400).json({
          status: false,
          message: "Invalid user role.",
        });
      }

      const checkPostResult = await pool
        .request()
        .input("ItemID", ItemID)
        .input("UserID", user.id)
        .query(checkPostQuery);
      console.log(ItemID);
      if (checkPostResult.recordset.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Item not found.",
        });
      }

      const deleteItemQuery = `
        EXEC DeleteItem @ItemID = @ItemID, @ItemType = @ItemType;
      `;

      const delete_item_result = await pool
        .request()
        .input("ItemID", ItemID)
        .input("ItemType", ItemType)
        .execute("DeleteItem");

      return res.status(200).json({
        status: true,
        message: "Item deleted successfully.",
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Error deleting item. Database connection issue.",
      });
    }
  } catch (error) {
    console.log(error);
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
      console.log(user);
      let carpenter_post = await pool
        .request()
        .input("CarpenterID", user.id)
        .input("ImageURL", ImageURL)
        .input("Description", Description)
        .input("Category", Category)
        .input("Material", Material)
        .execute("CarpenterItemAdd");
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

async function getItemsByUserID(req, res, next) {
  try {
    const user = req.user;
    const { pool } = req;
    if (pool.connected) {
      console.log(user);
      // let UserType;
      // if ((user.role = "Carpenter")) {
      //   UserType = "Carpenter";
      // } else if (user.role === "WorkshopOwner") {
      //   UserType = "WorkshopOwner";
      // }
      let results = await pool
        .request()
        .input("UserId", user.id)
        .input("UserType", user.role)
        .execute("GetItemsByUserID");
      res.status(200).json({
        status: "success",
        message: "Items fetched successfully",
        data: results.recordset,
      });
    } else {
      res.status(500).json({
        status: false,
        message: "error connecting to the database",
      });
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("There is a problem getting products", 400));
  }
}
async function getWorkshoItemByID(req, res, next) {
  try {
    const { item_id } = req.params;
    const { pool } = req;
    if (!/^[1-9]\d*$/.test(item_id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ItemID. ItemID must be of type int",
      });
    }
    if (pool.connected) {
      const item_data = await pool
        .request()
        .input("ItemID", item_id)
        .execute("GetWorkshopItemDetails");
      if (item_data.recordset?.length > 0) {
        return res.status(200).json({
          status: true,
          message: "Item data fetched successfully",
          data: item_data.recordset,
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "Item not found",
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "Get get the item at the moment. Please try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
}
async function getCarpenterItemByID(req, res, next) {
  try {
    const { id } = req.params;
    const { pool } = req;

    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ItemID. ItemID must be a positive integer.",
      });
    }
    if (pool.connected) {
      const item_data = await pool
        .request()
        .input("ItemID", id)
        .execute("GetCarpenterItemDetails");

      if (item_data?.recordset?.length > 0) {
        return res.status(200).json({
          status: true,
          message: "Item fetched successfully",
          data: item_data.recordset[0],
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "Item not found",
        });
      }
    } else {
      return res.status(401).json({
        status: false,
        message: "Can't get your item at the moment",
      });
    }
  } catch (error) {
    console.log(error);

    return next(new AppError("Internal Server Error", 500));
  }
}

async function getCarpenterPosts(req, res, next) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const results = await pool.request().execute("GetAllCarpenterItems");
      res.status(200).json({
        status: true,
        message: "Fetched carpenter's posts successfully",
        data: results.recordset,
      });
    } else {
      return res.status(404).json({
        status: false,
        message:
          "Unable to process your request at the moment. Please try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
}

async function getWorkShopPending(req, res, next) {
  try {
    const { pool } = req;
    const user = req.user;
    if (pool.connected) {
      const results = await pool
        .request()
        .input("WorkshopOwnerID", user.id)
        .execute("GetPendingWorkRequestsForWorkshopOwner");
      res.status(200).json({
        status: true,
        message: "Pending items fetched successfully",
        data: results.recordsets[0],
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "An error occured while fetching pending items",
      });
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
}

async function getWorkshopApproved(req, res, next) {
  try {
    const { pool } = req;
    const user = req.user;
    if (pool.connected) {
      const results = await pool
        .request()
        .input("WorkshopOwnerID", user.id)
        .execute("GetApprovedWorkRequestsForWorkshopOwner");
      res.status(200).json({
        status: true,
        message: "Fetched the approved Job successfully",
        data: results.recordsets[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Error loading resources",
      });
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
}
module.exports = {
  carpenterPostItem,
  postItem,
  getPendingItems,
  updateWorkshopItemStatus,
  deleteItems,
  getAllItems,
  getItemsByUserID,
  getCarpenterItemByID,
  getWorkshoItemByID,
  getCarpenterPosts,
  getWorkShopPending,
  getWorkshopApproved,
};
