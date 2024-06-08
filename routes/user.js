const router = require('express').Router();
const { userLogin, userRegister } = require('../controller/user')

router.route('/login').post(userLogin);
router.route('/register').post(userRegister);


module.exports = router;



