const router = require('express').Router();
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer_posts');
const check = require('../middlewares/token/check');

router.get('/',check, postCtrl.getAllPosts)
router.get('/user/:id',check, postCtrl.getAllPostsByUserId)
router.get('/:id', check, postCtrl.getOnePost)
router.post('/',check, multer, postCtrl.createPost)
router.put('/',check, postCtrl.updatePost)
router.delete('/:id',check, postCtrl.deletePost)


router.post('/like/:id', postCtrl.likePost)




module.exports = router