const User = require('../models/User');
const { verifyToken } = require('../helper/jwt');

const userAuthentication = async (req, res, next) => {
  try {
    const decoded = verifyToken(req.headers.access_token);
    const found = await User.findById(decoded.id).exec();

    if (found) {
      req['loggedUser'] = decoded;
      next();
    } else {
      throw {
        status: 401,
        message: 'Unauthorized',
      };
    }
  } catch (error) {
    next(error);
  }
};

const userAuthorization = async (req, res, next) => {
  try {
    const idUser = req.loggedUser.id; 
    const paramsId = req.params.id;

    if (idUser === paramsId) {
      next();
    } else {
      throw {
        status: 401,
        message: 'Unauthorized',
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userAuthentication,
  userAuthorization,
};
