const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let currentTicket = 0;
let ticketQueue = [];
let ticketsAtendidos = {};

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('solicitar-ticket', () => {
        currentTicket++;
        ticketQueue.push(currentTicket);
        io.emit('nuevo-ticket', currentTicket);
    });

    socket.on('atender-ticket', () => {
        if (ticketQueue.length > 0) {
            const ticketAtendido = ticketQueue.shift();
            const hoy = new Date().toLocaleDateString();
            ticketsAtendidos[hoy] = (ticketsAtendidos[hoy] || 0) + 1;
            io.emit('ticket-atendido', {
                ticket: ticketAtendido,
                ultimosTres: ticketQueue.slice(-3),
                cantidadAtendidos: ticketsAtendidos[hoy],
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
