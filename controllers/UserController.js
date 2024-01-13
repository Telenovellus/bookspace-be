const User = require("../models/User");
const { comparePassword } = require("../helper/hash");
const { generateToken } = require("../helper/jwt");

class UserController {

  static async checkUsername(req, res, next) {
    try {
      const found = await User.findOne({ username: req.body.username })

      if(found) {
        throw {
          status: 400,
          message: 'username already taken',
          data: false
        }
      }

      return res
        .status(200)
        .json({ message: "username available", status: "success", data: true });
    } catch (error) {
      next(error);
    }
  }
 
  static async register(req, res, next) {
    try {
      const properties = {};
      properties["username"] = req.body.username;
      properties["email"] = req.body.email;
      properties["password"] = req.body.password;
      properties["date_of_birth"] = req.body.date_of_birth
      properties["preferences"] = req.body.preferences
      properties["name"] = req.body.name
      
      const data = await User.create(properties);

      return res
        .status(201)
        .json({ message: "success register", status: "success" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const foundUser = await User.findOne({ username: req.body.username }).exec();

      if (foundUser && comparePassword(req.body.password, foundUser.password)) {
        const tokenPayload = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        };

        const access_token = generateToken(tokenPayload);

        res.status(200).json({
          message: "success login",
          data: { access_token },
          status: "success",
        });
      } else {
        throw {
          status: 400,
          message: "Invalid Username or Password",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async findAllUser(req, res, next) {
    try {
      let data = await User.find({}).exec();

      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      return res.status(200).json({
        data: data,
        message: "success GET users",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async findLoggedUser(req, res, next) {
    try {
      const id = req.loggedUser.id;
      const data = await User.findById(id).exec();

      // jika user tidak ada
      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      return res.status(200).json({
        data: data,
        message: "success find logged user",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id;

      // .exec() berfungsi untuk mengeksekusi query
      const data = await User.findById(id).exec();

      // jika user tidak ada
      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      return res.status(200).json({
        data: data,
        message: "success find by id user",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const id = req.loggedUser.id;

      const data = await User.findById(id).exec();

      // jika user tidak ada
      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      // update data
      data["username"] = req.body.username ? req.body.username : data.username;
      data["email"] = req.body.email ? req.body.email : data.email;
      data["updated_at"] = new Date().toISOString();

      const updatedData = await data.save();

      return res.status(200).json({
        data: updatedData,
        message: "success update user",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const id = req.loggedUser.id;

      const data = await User.findById(id).exec();

      // jika user tidak ada
      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      const deleted = await data.remove();

      return res.status(200).json({
        data: deleted,
        message: "success delete user",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
