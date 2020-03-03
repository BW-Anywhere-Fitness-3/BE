const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // <<< install this npm package

const Clients = require("../users/clients-model.js");
const Instructors = require("../users/instructors-model.js");
const { jwtSecret } = require("../config/secrets.js");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  console.log("Hello");
  if (~req.originalUrl.indexOf("/clients/")) {
    // console.log("This is another spot");
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
    
  // console.log("This is a third checkpoint");

    Clients.add(user)
      .then(saved => {
        // console.log("After then");
        res.status(201).json(saved);
      })
      .catch(error => {
        console.log("This is the catch");
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

    Clients.findBy({ username })
      .first()
      .then(client => {
        if (client && bcrypt.compareSync(password, client.password)) {
          const token = generateToken(client, 'client'); // get a token
          Clients.recordFirstLogin(client.id);
          res.status(200).json({
            message: `Welcome ${client.username}!`,
            isFirstLogin: !client.hasLoggedIn,
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
        .then(instructor => {
          if (instructor && bcrypt.compareSync(password, instructor.password)) {
            const token = generateToken(instructor, 'instructor'); // get a token
            Instructors.recordFirstLogin(instructor.id);
            res.status(200).json({
              message: `Welcome ${instructor.username}!`,
              isFirstLogin: !instructor.hasLoggedIn,
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

function generateToken(client, type) {
  const payload = {
    subject: client.id,
    username: client.username,
    role: client.role || type,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;