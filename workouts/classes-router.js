const router = require("express").Router();

const classes = require("./classes-model.js");

router.get("/", (req, res) => {
  classes.find()
    .then(classesList => {
      res.json(classesList);
    })
    .catch(err => res.send(err));
});

router.post("/", (req, res) => {
  let workoutClass = req.body;
  classes.add(workoutClass)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.delete("/:id", (req, res) => {
  classes.del(req.params.id)
    .then(isDeleted => {
      res.status(201).json({isDeleted: isDeleted});
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.put("/:id", (req, res) => {
  let workoutClass = req.body;
  classes.put(req.params.id, workoutClass)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

router.patch("/:id", (req, res) => {
  let workoutClass = req.body;
  classes.put(req.params.id, workoutClass)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = router;