const router = require('express').Router();
const postCtrl = require('../controllers/post');
const check = require('../middlewares/token/check');

router.get('/likes', check, postCtrl.getLastLikes )
router.get('/posts',check, postCtrl.getLastPosts)


module.exports = router