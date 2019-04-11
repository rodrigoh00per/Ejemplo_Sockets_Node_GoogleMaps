"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mapa_1 = require("../classes/mapa");
const router = express_1.Router();
//mapas inicio
exports.mapa = new mapa_1.Mapa();
const lugares = [
    { id: "1", nombre: "Estafeta", lat: 19.4647844, long: -99.114263 },
    { id: "2", nombre: "Bancomer Inguaran", lat: 19.4646402, long: -99.1141587 },
    { id: "3", nombre: "Alessia Autopartes", lat: 19.4649855, long: -99.1137089 }
];
exports.mapa.marcadores.push(...lugares);
//regresar marcadores
router.get("/mapa", (req, res) => {
    return res.send(exports.mapa.getMarcadores());
});
//mapas fin
//obtener los id de los usuarios conectados
exports.default = router;
