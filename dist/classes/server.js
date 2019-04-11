"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enviroment_1 = require("../global/enviroment");
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const socket = __importStar(require("../sockets/sockets"));
//recuerda instalar types/express
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = enviroment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer); //tenemos que poner este mismo configurado
        this.escucharSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new Server());
    }
    escucharSockets() {
        console.log("escuchando conexiones");
        //el on es para escuchar eventos
        this.io.on("connection", cliente => {
            socket.nuevoMarcador(cliente);
            socket.eliminarMarcador(cliente);
            socket.modificarMarcador(cliente);
            socket.conectarCliente(cliente, this.io);
            //configurar usuario
            socket.configurarUsuario(cliente, this.io);
            socket.clientesConectados(cliente, this.io);
            //mensajes
            socket.mensaje(cliente, this.io);
            //desconectar
            socket.desconectar(cliente, this.io); //aqui mandamos a llamar la funcion de cuando un cliente se desconecta
        });
    }
    start(callback) {
        return this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
