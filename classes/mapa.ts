import { Marcador } from "./marcador";

export class Mapa {
  public marcadores: Marcador[];
  constructor() {
    this.marcadores = [];
  }

  getMarcadores() {
    return this.marcadores;
  }

  agregarMarcador(marcador: Marcador) {
    this.marcadores.push(marcador);
  }
  borrarMarcador(id: String) {
    this.marcadores = this.marcadores.filter(
      (marcador: Marcador) => marcador.id !== id
    );
  }

  moverMarcador(marcador: Marcador) {
    for (let i = 0; i < this.marcadores.length; i++) {
      if (this.marcadores[i].id === marcador.id) {
        this.marcadores[i].lat = marcador.lat;
        this.marcadores[i].long = marcador.long;
      }
    }
  }
}
