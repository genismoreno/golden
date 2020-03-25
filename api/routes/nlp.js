const express = require('express');
const router = express.Router();
const exec = require("child_process").exec;

/* PUT correct text */
router.put('/', function (req, res, next) {
  if (req.body && req.body.text) {
    const pythonProcess = exec(`python scripts/nlp.py ${req.body.text.toString().trim()}`);
    pythonProcess.stdout.on('data', correctedText => res.json({ correctedText: correctedText.toString().trim() }));

    pythonProcess.stderr.on('data', (error) => {
      console.error(`stderr: ${error}`);
      let err = new Error(error);
      err.status = 400;
      return next(err);
    });

  } else {
    let err = new Error("Text not present");
    err.status = 400;
    return next(err);
  }
});


module.exports = router;
