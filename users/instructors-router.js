const router = require("express").Router();

const instructors = require("./instructors-model.js");

router.get("/", (req, res) => {
    instructors.find()
    .then(instructorList => {
      res.json(instructorList);
    })
    .catch(err => res.send(err));
});

module.exports = router;