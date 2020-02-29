const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // <<< install this npm package

const Users = require("../users/clients-model.js");
const Instructors = require("../users/instructors-model.js");
const { jwtSecret } = require("../config/secrets.js");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  if (~req.originalUrl.indexOf("/clients/")) {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Instructors.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.post("/login", (req, res) => {
  if (~req.originalUrl.indexOf("/clients/")) {
    let { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(client => {
        if (client && bcrypt.compareSync(password, client.password)) {
          const token = generateToken(client); // get a token

          res.status(200).json({
            message: `Welcome ${client.username}!`,
            token, // send the token
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "/login error" });
      });
  } else {
      let { username, password } = req.body;

      Instructors.findBy({ username })
        .first()
        .then(client => {
          if (client && bcrypt.compareSync(password, client.password)) {
            const token = generateToken(client); // get a token

            res.status(200).json({
              message: `Welcome ${client.username}!`,
              token, // send the token
            });
          } else {
            res.status(401).json({ message: "Invalid Credentials" });
          }
        })
        .catch(error => {
          console.log("ERROR: ", error);
          res.status(500).json({ error: "/login error" });
        });
    }
  });

function generateToken(client) {
  const payload = {
    subject: client.id,
    username: client.username,
    role: client.role || "user",
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;