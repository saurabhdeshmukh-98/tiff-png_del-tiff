const router = require("express").Router();
const contro = require("../controller/tiffTopnjCon");
const multer = require("multer");
const fs= require('fs')
const maxSize=1200000

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    console.log("file: ", file);

    if (file.mimetype == "image/png" || file.mimetype == "image/tiff") {
      cb(null, true);
    } else {
      cb(null, false);

      return new Error("only png or tiff file allowed");
    }
  },
  limits: { fileSize: maxSize }
});

router.post('/save', upload.single('path'), contro.sendFile)
router.post('/convertToPng',upload.single('path'),contro.blobConverter)


module.exports = router;
