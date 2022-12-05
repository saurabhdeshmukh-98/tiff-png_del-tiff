const convertTiff = require('tiff-to-png')
const { unlink } = require('fs')
const fs = require('fs')
const path = require('path')
const { Blob } = require('buffer')


const sendFile = async (req, res) => {
  try {
    const file = req.file.path;
    console.log("path:", file);

    var options = {
      logLevel: 1,
    };

    var converter = new convertTiff(options);
    var location = "./Upload";

    const resp = await converter.convertOne(file, location);
    unlink(file, function (err) {
      if (err) throw err;

      console.log("file deleted");
    });

    res.status(200).json({
      response: resp,
      message: "successfully converted",
    });
  } catch (error) {
    res.status(400).json({
      response: "not converted cheak onece..",
    });
  }
};
const blobConverter = (req, res) => {
    try {
        const buff1 = fs.readFileSync(req.file.path)
        console.log(buff1.toString())
        // const buff = Buffer.from(buff1)
        // console.log(buff)
        // const blob = new Blob([buff], { type: 'image/png' })
        // console.log(blob)
        fs.unlinkSync(req.file.path, function (err) {
          if (err) {
            console.log(err)
          } else {
            console.log('sample.png file is deleted')
          }
        })
        res.status(200).json({
          response: buff1.toString(),
          message: 'png file successfully converted into blob'
        })
      } catch (error) {
        console.log(error.message)
        res.status(400).json({
          response: null,
          message: 'Failed to converted into blob format'
        })
      }
    }

module.exports = { sendFile,blobConverter };
