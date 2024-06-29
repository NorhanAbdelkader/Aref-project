const express =require("express");
const router =express.Router();
const { register, login } = require('./userController.js'); 
//const asyncHandler =require("express-async-handler");
/**
 * @desc Register/login/logout/delete account/reset password
 * @route /api/auth/register
 * @method POST
 * @access public
 */

router.post('/register', register);
router.post('/login', login);
 
 module.exports = router;