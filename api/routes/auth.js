const router = require('express').Router();

const signupCtrl = require('../guard/signup')
const findUserCtrl = require('../guard/login')
const updatePassword = require('../guard/updatePassword')
const deleteUser = require('../guard/deleteUser')
const hashPass = require('../middlewares/bcrypt/hash')
const cryptEmail = require('../middlewares/cryptoJS/cryptEmail')
const checkPass = require('../middlewares/bcrypt/check')
const tokenCtrl = require('../middlewares/token/send')
const multer = require('../middlewares/multer')
const checkToken = require('../middlewares/token/check')


/* GET users listing. */
router.post('/signup',multer, hashPass, cryptEmail, signupCtrl);
router.post('/login', cryptEmail, findUserCtrl, checkPass, tokenCtrl)
router.put('/update-password', updatePassword)
router.post('/:id', checkToken, deleteUser);


module.exports = router;
