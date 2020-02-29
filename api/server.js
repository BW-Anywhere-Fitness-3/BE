const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
const clientsRouter = require("../users/clients-router.js");
const instructorsRouter = require("../users/instructors-router.js");
const classesRouter = require("../workouts/classes-router.js");
const restricted = require("../auth/restricted-middleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/clients", authRouter);
server.use("/api/instructors", authRouter);
// server.use("/api/clients", restricted, checkRole("client"), clientsRouter);
server.use("/api/classes", restricted, checkRole("instructor"), classesRouter);

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
      res.status(403).json({ you: "shall not pass!", role: req.decodedToken.role.toLowerCase() });
    }
  };
}
