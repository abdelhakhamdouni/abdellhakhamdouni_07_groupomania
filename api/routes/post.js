const router = require('express').Router();
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer_posts');

router.get('/', postCtrl.getAllPosts)
router.get('/user/:id', postCtrl.getAllPostsByUserId)
router.get('/:id', postCtrl.getOnePost)
router.post('/',multer, postCtrl.createPost)
router.put('/', postCtrl.updatePost)
router.delete('/:id', postCtrl.deletePost)


router.post('like/:id', postCtrl.likePost)




module.exports = router