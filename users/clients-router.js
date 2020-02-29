const router = require("express").Router();

const clients = require("./clients-model.js");

router.get("/", (req, res) => {
  clients.find()
    .then(clientsList => {
      res.json(clientsList);
    })
    .catch(err => res.send(err));
});

module.exports = router;