const mongoose = require("mongoose");
const EquipoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    league: { type: String, required: true, trim: true },
    escudo: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);
const Equipo = mongoose.model("Equipo", EquipoSchema);
module.exports = Equipo;
