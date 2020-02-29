const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // <<< install this npm package

// const clients = require("../users/clients-model.js");
// const instructors = require("../users/instructors-model.js");
const { jwtSecret } = require("../config/secrets.js");


// for endpoints beginning with 
router.post("/register", (req, res) => {
  let thisInstructor = req.body;
  console.log('Registering user: ', req.body);
  if (~req.path.indexOf("/clients/")) {
    const hash = bcrypt.hashSync(thisClient.password, 10); // 2 ^ n
    thisClient.password = hash;
    res.status(500).json({ error: "no functioning db" });
    clients.add(thisClient)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    const hash = bcrypt.hashSync(thisInstructor.password, 10); // 2 ^ n
    thisInstructor.password = hash;

    instructor.add(thisInstructor)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (~req.path.indexOf("/clients/")) {
    clients.findBy({ username })
      .first()
      .then(thisClient => {
        if (thisClient && bcrypt.compareSync(password, thisClient.password)) {
          const token = generateClientToken(thisClient); // get a token

          res.status(200).json({
            message: `Welcome ${thisClient.username}!`,
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
    instructors.findBy({ username })
      .first()
      .then(thisInstructor => {
        if (thisInstructor && bcrypt.compareSync(password, thisInstructor.password)) {
          const token = generateInstructorToken(thisInstructor); // get a token

          res.status(200).json({
            message: `Welcome ${thisInstructor.username}!`,
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

function generateClientToken(thisCLient) {
  const payload = {
    subject: thisCLient.id,
    username: thisCLient.username,
    role: thisCLient.role || "client",
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

function generateInstructorToken(thisInstructor) {
  const payload = {
    subject: thisInstructor.id,
    username: thisInstructor.username,
    role: thisInstructor.role || "instructor",
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;