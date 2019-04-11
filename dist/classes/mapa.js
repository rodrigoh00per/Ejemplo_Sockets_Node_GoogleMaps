"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mapa {
    constructor() {
        this.marcadores = [];
    }
    getMarcadores() {
        return this.marcadores;
    }
    agregarMarcador(marcador) {
        this.marcadores.push(marcador);
    }
    borrarMarcador(id) {
        this.marcadores = this.marcadores.filter((marcador) => marcador.id !== id);
    }
    moverMarcador(marcador) {
        for (let i = 0; i < this.marcadores.length; i++) {
            if (this.marcadores[i].id === marcador.id) {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].long = marcador.long;
            }
        }
    }
}
exports.Mapa = Mapa;
