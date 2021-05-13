const router = require('express').Router();
const commentCtrl = require('../controllers/comment');
const check = require('../middlewares/token/check');

router.post('/',check, commentCtrl.createComment)
router.delete('/:id',check, commentCtrl.deleteComment)





module.exports = router