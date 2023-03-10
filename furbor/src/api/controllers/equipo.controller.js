const Equipo = require("../models/equipo.model");
const { deleteImgCloudinary } = require("../../middlewares/files.middleware");
const getAllEquipos = async (req, res, next) => {
  try {
    const allEquipos = await Equipo.find();
    return res.status(200).json(allEquipos);
  } catch (error) {
    return next("Equipos not found");
  }
};

const createEquipo = async (req, res, next) => {
  try {
    const equipo = new Equipo({
      ...req.body,
      escudo: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dpsqwk5qg/image/upload/v1678374524/imgdefault/download_jkhtml.png",
    });
    const createdEquipo = await equipo.save();
    return res.status(201).json(createdEquipo);
  } catch (error) {
    return next("Error creating equipo", error);
  }
};

const updatedEquipoID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newEquipo = new Equipo(req.body);
    newEquipo._id = id;
    const originalEquipo = await Equipo.findById(id);
    if (req.file) {
      deleteImgCloudinary(originalEquipo.escudo);
      newEquipo.escudo = req.file.path;
    }
    await Equipo.findByIdAndUpdate(id, newEquipo);
    return res.status(200).json(newEquipo);
  } catch (error) {
    return next("Failing updating movie", error);
  }
};
module.exports = { getAllEquipos, createEquipo, updatedEquipoID };
