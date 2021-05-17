const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./user');
const postRouter = require('./post');
const commentRouter = require('./comment');
const messageRouter = require('./chat');


router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/messages', messageRouter);

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
router.use(function(err, req, res, next) {
// set locals, only providing error in development
console.log(err)
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};
// render the error page
res.status(err.status || 500);
res.json({err,msg:"error in your request"})
});

module.exports = router