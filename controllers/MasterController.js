const Category = require("../models/Category");

class MasterController {

  static async getList(req, res, next) {
    try {
        const categories = await Category.find()

      return res
        .status(200)
        .json({ message: "categories data", status: "success", data: categories });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
        await Category.create({ label: req.body.label })

      return res
        .status(201)
        .json({ message: "category created", status: "success" });
    } catch (error) {
      next(error);
    }
  }
 
}

module.exports = MasterController;
