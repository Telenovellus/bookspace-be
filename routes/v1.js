const router = require('express').Router();
const CollectionController = require('../controllers/CollectionController');
const MasterController = require('../controllers/MasterController');
const UserController = require('../controllers/UserController');
const { userAuthentication } = require('../middlewares/auth');
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

router.route('/').get((req, res) => {
  res.send('connected !');
});

router.route('/login').post(UserController.login);

router.route('/register').post(UserController.register);

router.route('/user/check-availability')
  .post(UserController.checkUsername)

router
  .route('/users')
  .get(userAuthentication, UserController.findAllUser);
router
  .route('/user')
  .get(userAuthentication, UserController.findLoggedUser)
  .put(userAuthentication, UserController.updateUser)
  .delete(userAuthentication, UserController.deleteUser);

router
  .route('/users/:id')
  .get(userAuthentication, UserController.findById);


// CATEGORY
router.route('/master/category')
  .get(MasterController.getList)
  .post(MasterController.create)

// BOOK COLLECTION
router.route('/book-collection/request')
  .post(upload.single('images'), userAuthentication, CollectionController.createRequest)

  router.route('/book-collection/donation')
  .post(upload.single('images'), userAuthentication, CollectionController.createDonation)

router.route('/book-collection/request/:user_id')
  .get(userAuthentication, CollectionController.getListRequestByUserId)

router.route('/book-collection/request/get-login-data')
  .get(userAuthentication, CollectionController.getListRequestByUserId)

router.route('/book-collection/donation/get-login-data')
  .get(userAuthentication, CollectionController.getListDonationByUserId)

module.exports = router;
