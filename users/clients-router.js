const router = require("express").Router();

const clients = require("./clients-model.js");

router.get("/", (req, res) => {
  console.log("I want a list of clients now");
  clients.find()
    .then(clientsList => {
      res.json(clientsList);
    })
    .catch(err => res.send(err));
});

router.post("/", (req, res) => {
  let clientsList = req.body;
  clients.add(clientsList)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });
})

router.delete("/:id", (req, res) => {
  clientsList.del(req.params.id)
    .then(isDeleted => {
      res.status(201).json({isDeleted: isDeleted});
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.put("/:id", (req, res) => {
  let clientsList = req.body;
  clients.put(req.params.id, clientsList)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.patch("/:id", (req, res) => {
  let clientsList = req.body;
  clients.put(req.params.id, clientsList)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = router;