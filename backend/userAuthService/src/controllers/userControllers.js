const AppError = require("../utils/appError");
const createUserValidator = require("../validators/newUserValidator");
const bcrypt = require("bcrypt");
const User = require("../utils/getUser");
const loginUserValidator = require("../validators/loginValidator");

const sendMail = require("../utils/email");
const { updateProfileValidator } = require("../validators/getUserValidator");
const { errorMonitor } = require("nodemailer/lib/xoauth2");
const getChatValidator = require("../validators/getChatValidator");

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
      Latitude,
      Longitude,
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
        .input("Latitude", Latitude)
        .input("Longitude", Longitude)
        .execute("CreateUser");

      res.json({
        success: true,
        results: "New user created",
      });
      if (results.recordsets[0]) {
        let message = `Account created successfully, Wait for approval to login`;
        await sendMail({
          email: Email,
          subject: `SignUp`,
          message,
        });
        res.status(200).json({
          status: "success",
          message: "Email sent successfully",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { pool } = req;
    const user = req.session.user;
    const { Bio, ProfilePhoto } = req.body;
    const { value } = updateProfileValidator(req.body);
    console.log(value);
    if (pool.connected) {
      const update_profile = await pool
        .request()
        .input("UserId", user.id)
        .input("About", Bio)
        .input("ProfilePhoto", ProfilePhoto)
        .execute("UpdateUserProfile");
      res.status(200).json({
        status: "success",
        message: "Profile updated sucessfully",
      });
    } else {
      return next(new AppError("Error connecting to the database", 400));
    }
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
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
    if (!user) {
      return next(
        new AppError("Email Account does not exist! Please Register"),
        401
      );
    }

    let password_match = await bcrypt.compare(Password, user.PasswordHash);

    if (password_match) {
      req.session.authorized = true;
      req.session.user = {
        id: user.UserID,
        role: user.Role,
      };

      res.json({
        status: "success",
        message: "Logged in successfully",
        role: user.Role,
      });
    } else {
      return next(new AppError("Incorrect Email or Password", 401));
    }
  } catch (error) {
    console.error(error.message);
    res.send(error.message);
  }
}

async function getCarpenters(req, res, next) {
  try {
    const { pool } = req;
    if (pool.connected) {
      const results = await pool.request().execute("GetCarpenters");
      res.status(200).json({
        status: true,
        messsage: "Fetched all the carpenters successfully",
        data: results.recordsets[0],
      });
    } else {
      return next(new AppError("Error connecting to the database", 400));
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
}

// async function login(req, res, next) {
//   try {
//     const login_body = req.body;
//     const { value } = loginUserValidator(login_body);
//     console.log(value);
//     const { pool } = req;
//     const { Email, Password } = login_body;
//     let user = await User(Email, pool);
//     if (!user) {
//       return next(
//         new AppError("Email Account does not exist! Please Register"),
//         401
//       );
//     }
//     console.log(user);
//     if (user) {
//       let password_match = await bcrypt.compare(Password, user.PasswordHash);
//       if (password_match) {
//         req.session.authorized = true;
//         req.session.user = user;
//         res.json({
//           status: "success",
//           message: "logged in successfully",
//         });
//       } else {
//         return next(new AppError("Incorrect Email or Password", 401));
//       }

//       if (!Email || !Password) {
//         return next(
//           new AppError("Please provide both email and password"),
//           400
//         );
//       }

//       if (!user) {
//         return next(new AppError("Incorrect email or password"), 401);
//       }
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.send(error.message);
//   }
// }
async function getWorkshopOwners(req, res, next) {
  try {
    const { pool } = req;
    if (pool.connected) {
      let results = await pool.request().execute("GetWorkShopOwners");
      res.status(200).json({
        status: true,
        message: "Fetched Workshop Owners and workshop details successfully",
        data: results.recordsets[0],
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Error fetching workshop information",
        data: results.recordsets[0],
      });
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
}
async function getProfileDetails(req, res, next) {
  try {
    const { pool } = req;
    const user = req.session.user;
    if (pool.connected) {
      const resulsts = await pool
        .request()
        .input("UserID", user.id)
        .execute("GetUserDetails");
      res.status(200).json({
        status: true,
        message: "Profile Fetched successfully",
        data: resulsts.recordsets[0],
      });
    } else {
      return next(new AppError("Error connecting to the database", 404));
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Error Getting ProfileDetails", 500));
  }
}
async function logout(req, res, next) {
  try {
    console.log("logging out");
    const user = req.session.user;
    if (user) {
      req.session.destroy();
      res.send("logged out successfully");
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}
async function createChatRoom(req, res, next) {
  try {
    const { Participant2ID } = req.body;
    const user = req.session.user;
    const { pool, io } = req;
    if (pool.connected) {
      let results = await pool
        .request()
        .input("Participant1ID", user.id)
        .input("Participant2ID", Participant2ID)
        .execute("CreateChatRoom");
      io.emit("chat_room_created", {
        room: `chat_room_${user.id}_${Participant2ID}`,
        participants: [user.id, Participant2ID],
      });
      if (results.recordset.length > 0) {
        res.status(200).json({
          status: true,
          message: "Chat Room Created successfully",
          data: results.recordset[0],
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Error creating a chat room",
        });
      }
    } else {
      return next(
        new AppError(
          "Cant connect to the database at the moment please try again later",
          404
        )
      );
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Can't Create a room at the moment", 500));
  }
}
async function sendMessage(req, res, next) {
  try {
    const { pool, io } = req;
    const user = req.session.user;
    const { ChatRoomID, Content } = req.body;
    if (pool.connected) {
      console.log(user);
      const results = await pool
        .request()
        .input("ChatRoomID", ChatRoomID)
        .input("SenderID", user.id)
        .input("Content", Content)
        .execute("SendMessage");
      io.to(`chat_room_${ChatRoomID}`).emit("receive_message", {
        room: `chat_room_${ChatRoomID}`,
        sender: user.id,
        content: Content,
      });
      if (results.recordsets) {
        res.status(200).json({
          status: true,
          message: "message sent successfully",
          results: results,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Message not sent",
        });
      }
    } else {
      return next(
        new AppError("Can't connect to the database at the moment", 404)
      );
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Cant send your message at the moment", 500));
  }
}
async function getChatRoomMessages(req, res, next) {
  try {
    const { pool, io } = req;
    const user = req.session.user;
    const { Participant2ID } = req.body;

    if (pool.connected) {
      const results = await pool
        .request()
        .input("Participant1ID", user.id)
        .input("Participant2ID", Participant2ID)
        .execute("GetMessagesForParticipants");
      io.emit("fetching_messages", {
        participants: [user.id, Participant2ID],
      });
      console.log(user.id);
      if (results.recordsets.length) {
        res.status(200).json({
          status: true,
          message: "Messages for this Room fetched successfully",
          data: results.recordset,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Room Not found",
        });
      }
    } else {
      res.status(404).json({
        status: false,
        message: "Error connecting to the dataabase",
      });
    }
  } catch (error) {
    console.log(error.message);
    return next(new AppError(error.message, 500));
  }
}

async function getUserByID(req, res, next) {
  try {
    const { user_id } = req.params;
    const { pool } = req;
    if (!/^[1-9]\d*$/.test(user_id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ItemID. ItemID must be of type int",
      });
    }
    if (pool.connected) {
      const user_details = await pool
        .request()
        .input("UserID", user_id)
        .execute("GetUserDetails");
      if (user_details.recordset?.length > 0) {
        return res.status(200).json({
          status: true,
          message: "User data fetched successfully",
          data: user_details.recordset,
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "Can't get the User at the moment. Please try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Error getting the user", 500));
  }
}

module.exports = {
  signUp,
  login,
  logout,
  updateProfile,
  getCarpenters,
  getWorkshopOwners,
  getProfileDetails,
  getUserByID,
  createChatRoom,
  sendMessage,
  getChatRoomMessages,
};
