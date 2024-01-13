const { uploadImage } = require("../helper/uploadFile");
const Category = require("../models/Category");
const Collection = require("../models/Collection");

class CollectionController {

  static async getListRequestByUserId(req, res, next) {
    try {
        const bookRequest = await Collection.find({ user_id: req.params.user_id, action_type: 'REQUEST' })

      return res
        .status(200)
        .json({ message: "book collection request data", status: "success", data: { rows: bookRequest, count: bookRequest.length } });
    } catch (error) {
      next(error);
    }
  }


  static async createRequest(req, res, next) {
    try {
        const imageUrl = await uploadImage(req.file)

        const payload = {
            action_type: 'REQUEST',
            user_id: req.loggedUser.id,
            status: 'PENDING',
            request_properties: {
                name: req.body.name,
                phone_number: req.body.phone_number,
                email: req.body.email,
                preferred_receiving_option: req.body.preferred_receiving_option,
                pick_up_time: new Date(req.body.pick_up_time).toISOString(),
                remarks_desc: req.body.remarks_desc,
                book_category: req.body.book_category,
                book_title: req.body.book_title,
                book_author: req.body.book_author,
                book_image_url: imageUrl
            }
        }

        await Collection.create(payload)

      return res
        .status(201)
        .json({ message: "book collection request created", status: "success" });
    } catch (error) {
      next(error);
    }
  }

  static async getListDonationByUserId(req, res, next) {
    try {
        const bookDonations = await Collection.find({ user_id: req.params.user_id, action_type: 'DONATION' })

      return res
        .status(200)
        .json({ message: "book collection donation data", status: "success", data: { rows: bookDonations, count: bookDonations.length } });
    } catch (error) {
      next(error);
    }
  }

  static async getListDonation(req, res, next) {
    try {
        const bookDonations = await Collection.find({ action_type: 'DONATION' })

      return res
        .status(200)
        .json({ message: "book collection donation data", status: "success", data: { rows: bookDonations, count: bookDonations.length } });
    } catch (error) {
      next(error);
    }
  }

  static async createDonation(req, res, next) {
    try {
        const imageUrl = await uploadImage(req.file)

        const payload = {
            action_type: 'DONATION',
            user_id: req.loggedUser.id,
            status: 'PENDING',
            donate_properties: {
                name: req.body.name,
                preferred_donation_option: req.body.preferred_donation_option,
                remarks_desc: req.body.remarks_desc,
                book_category: req.body.book_category,
                book_title: req.body.book_title,
                book_author: req.body.book_author,
                book_image_url: imageUrl
            }
        }

        await Collection.create(payload)

      return res
        .status(201)
        .json({ message: "book collection donation created", status: "success" });
    } catch (error) {
      next(error);
    }
  }
 
}

module.exports = CollectionController;
