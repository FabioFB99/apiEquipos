const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./src/utils/connect");
const { configCloudinary } = require("./src/middlewares/files.middleware.js");
const PORT = process.env.PORT || 8889;
dotenv.config();
configCloudinary();

//conect to db
connect();

const server = express();
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//parser
server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ limit: "5mb", extended: true }));
//routes
const EquiposRoutes = require("./src/api/routes/equipo.routes");
server.use("/api/v1/equipo", EquiposRoutes);

const UsersRoutes = require("./src/api/routes/users.routes");
server.use("/api/v1/users", UsersRoutes);
//route not found
server.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  return next(error);
});
// hide tech
server.disable("x-powered-by");

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
