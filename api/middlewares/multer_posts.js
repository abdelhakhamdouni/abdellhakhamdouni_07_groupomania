const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
  "video/webm": "webm",
};

const PATH_NAME = "uploads/posts_image"

var storage = multer.diskStorage({

  
  destination: function (req, file, next) {
    if (file == undefined) {
      next();
    }
    next(null, PATH_NAME);
  },
  filename: function (req, file, next) {
    
    if (file == undefined) {
      next();
    }
    const extension = MIME_TYPES[file.mimetype];
    let fileName = Date.now() + "." + extension;
    next(null, fileName);
  },
});

module.exports = multer({ storage: storage }).single("image");