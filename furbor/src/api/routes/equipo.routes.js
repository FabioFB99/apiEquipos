const express = require("express");
const { upload } = require("../../middlewares/files.middleware");
const EquiposRoutes = express.Router();
const {
  getAllEquipos,
  createEquipo,
  updatedEquipoID,
} = require("../controllers/equipo.controller");

EquiposRoutes.get("/", getAllEquipos);
EquiposRoutes.post("/", upload.single("escudo"), createEquipo);
EquiposRoutes.patch("/:id", upload.single("escudo"), updatedEquipoID);
module.exports = EquiposRoutes;
