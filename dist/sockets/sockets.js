"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsuariosLista_1 = require("../classes/UsuariosLista");
const usuario_1 = require("../classes/usuario");
const router_1 = require("../routes/router");
exports.usuariosLista = new UsuariosLista_1.UsuariosLista();
//aqui estamos configurando el cliente por default
exports.conectarCliente = (cliente, io) => {
    console.log("----------------------");
    let usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosLista.agregar(usuario);
};
exports.nuevoMarcador = (cliente) => {
    cliente.on("nuevo-marcador", marcadorsi => {
        router_1.mapa.agregarMarcador(marcadorsi);
        cliente.broadcast.emit("nuevo-marcador", marcadorsi);
    });
};
exports.modificarMarcador = (cliente) => {
    cliente.on("modificar-marcador", marcadorparamodificar => {
        router_1.mapa.moverMarcador(marcadorparamodificar);
        cliente.broadcast.emit("modificar-marcador", marcadorparamodificar);
    });
};
exports.eliminarMarcador = (cliente) => {
    cliente.on("eliminarMarcador", id_marcador => {
        console.log("ESTOY EN EL ELIMINAR");
        router_1.mapa.borrarMarcador(id_marcador);
        cliente.broadcast.emit("eliminarMarcador", id_marcador);
    });
};
exports.desconectar = (cliente, io) => {
    //aqui detectamos cuando un cliente se desconecta
    cliente.on("disconnect", () => {
        console.log("Cliente desconectado");
        console.log("el usuario desconectado es ", cliente.id);
        exports.usuariosLista.borrarUsuario(cliente.id);
        io.emit("usuarios-activos", exports.usuariosLista.getLista());
    });
};
exports.mensaje = (cliente, io) => {
    cliente.on("mensaje", (payload) => {
        console.log("El mensaje es ", payload);
        io.emit("mensaje-nuevo", payload); //aqui es cuando recibimos un mensaje lo mandamos de vuelta
    });
};
exports.configurarUsuario = (cliente, io) => {
    cliente.on("configurar-usuario", (payload, callback) => {
        exports.usuariosLista.actualizarNombre(cliente.id, payload.nombre);
        console.log(exports.usuariosLista.getLista().length);
        io.emit("usuarios-activos", exports.usuariosLista.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });
};
exports.clientesConectados = (cliente, io) => {
    cliente.on("clientes-conectados", () => {
        console.log("entre a clientes conectados");
        io.in(cliente.id).emit("usuarios-activos", exports.usuariosLista.getLista());
    });
};
