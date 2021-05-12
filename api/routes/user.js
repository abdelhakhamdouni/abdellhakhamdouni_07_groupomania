const router = require('express').Router();
const userCtrl = require('../controllers/user')
const checkToken = require('../middlewares/token/check') 
const multer = require('../middlewares/multer')
const hash = require('../middlewares/bcrypt/hash')


/* GET home page. */
router.get('/:id', checkToken, userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);
router.put('/edit/avatar/:id', checkToken, multer, userCtrl.updateUserAvatar);
router.put('/edit/password/:id', checkToken, userCtrl.updateUserPassword);
router.delete('/:id', checkToken, userCtrl.deleteUser);

module.exports = router;
