const express = require('express');
const router = express.Router();
const spawn = require("child_process").spawn;
const Phrase = require('../models/phrase');


/* POST process */
router.post('/', function (req, res, next) {
  if (req.body && req.body.phrase) {
    getLatestCrc().then(sumCrc => {
      const pythonProcess = spawn('python', ["scripts/cipher.py", sumCrc, req.body.phrase]);
      pythonProcess.stdout.on('data', (data) => {
        let { message, crc } = JSON.parse(data);

        storeMessage(message, crc)
          .then(() => res.json({ encryptedPhrase: message }))
          .catch(error => {
            let err = new Error(error);
            err.status = 400;
            return next(err)
          });
      });

      pythonProcess.stderr.on('data', (error) => {
        console.error(`stderr: ${error}`);
        let err = new Error(error);
        err.status = 400;
        return next(err);
      });
    }).catch(error => {
      let err = new Error(error);
      err.status = 400;
      return next(err)
    });
  } else {
    let err = new Error("Message not present");
    err.status = 400;
    return next(err);
  }
});

router.delete('/', function (req, res, next) {
  Phrase.remove({}).then(() => res.end()).catch(error => {
    let err = new Error(error);
    err.status = 400;
    return next(err)
  });
});

async function storeMessage(message, crc) {
  await Phrase.create({
    message: message,
    sumCrc: crc
  }, (error) => {
    if (error) {
      throw error;
    }
  })
}

async function getLatestCrc() {
  let phrase = await Phrase.findOne({}, { 'sumCrc': 1 }, { sort: { 'createdAt': -1 } }, (error) => {
    if (error) {
      throw error;
    }
  });
  if (!phrase || !phrase.sumCrc) {
    return 0;
  }
  return phrase.sumCrc;
}

module.exports = router;
