const router = require('express').Router();
const chatCtrl = require('../controllers/chat');
const check = require('../middlewares/token/check');

router.get('/',check, chatCtrl.getAllMessages)
// router.get('/lasts',check, chatCtrl.getLastchats)
// router.get('/user/:id',check, chatCtrl.getAllchatsByUserId)
// router.get('/:id', check, chatCtrl.getOnechat)
router.post('/',check, chatCtrl.createMessage)
// router.put('/:id',check, chatCtrl.updatechat)
router.delete('/:id',check, chatCtrl.deleteMessage)


// router.chat('/like/:id', chatCtrl.likechat)




module.exports = router