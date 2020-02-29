const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
// const clientsRouter = require("../users/clients-router.js");
// const instructorsRouter = require("../users/instructors-router.js");
const restricted = require("../auth/restricted-middleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use("/api/clients/login", authRouter);
// server.use("/api/instructors/login", authRouter);
// server.use("/api/clients/register", authRouter);
// server.use("/api/instructors/register", authRouter);
// server.use("/api/authclient", authRouter);


// server.use("/api/clients", restricted, checkRole("client"), clientsRouter);
// server.use("/api/instructors", restricted, checkRole("instructor"), instructorsRouter);

// server.post("/api/clients/register", (req, res) => {
//   let thisInstructor = req.body;
//   console.log('Registering user: ', req.body);
//   if (~req.path.indexOf("/clients/")) {
//     res.status(500).json({error:"no functioning db"});
//   } else {
//     res.status(500).json({path:req.path});
//   }
// });

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;

function checkRole(role) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.role &&
      req.decodedToken.role.toLowerCase() === role
    ) {
      next();
    } else {
      res.status(403).json({ you: "shall not pass!" });
    }
  };
}