import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { usuariosLista } from "../sockets/sockets";
import { Mapa } from "../classes/mapa";

const router = Router();





//mapas inicio

export const mapa = new Mapa();

const lugares = [
  { id: "1", nombre: "Estafeta", lat: 19.4647844, long: -99.114263 },
  { id: "2", nombre: "Bancomer Inguaran", lat: 19.4646402, long: -99.1141587 },
  { id: "3", nombre: "Alessia Autopartes", lat: 19.4649855, long: -99.1137089 }
];

mapa.marcadores.push(...lugares);

//regresar marcadores

router.get("/mapa", (req: Request, res: Response) => {
  return res.send(mapa.getMarcadores());
});

//mapas fin


//obtener los id de los usuarios conectados



export default router;
