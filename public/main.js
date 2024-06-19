const socket = io();

const solicitarTicketBtn = document.getElementById('solicitar-ticket');
const atenderTicketBtn = document.getElementById('atender-ticket');
const ticketActualDiv = document.getElementById('ticket-actual');
const ultimosTicketsDiv = document.getElementById('ultimos-tickets');
const ticketsAtendidosDiv = document.getElementById('tickets-atendidos');
const sonidoTicket = document.getElementById('sonido-ticket');

solicitarTicketBtn.addEventListener('click', () => {
    socket.emit('solicitar-ticket');
});

atenderTicketBtn.addEventListener('click', () => {
    socket.emit('atender-ticket');
});

socket.on('nuevo-ticket', (ticket) => {
    console.log(`Nuevo ticket: ${ticket}`);
});

socket.on('ticket-atendido', ({ ticket, ultimosTres, cantidadAtendidos }) => {
    ticketActualDiv.innerHTML = `<h2>Ticket Actual: ${ticket}</h2>`;
    ultimosTicketsDiv.innerHTML = `<h3>Últimos 3 tickets: ${ultimosTres.join(', ')}</h3>`;
    ticketsAtendidosDiv.innerHTML = `<h4>Tickets atendidos hoy: ${cantidadAtendidos}</h4>`;
    sonidoTicket.play();
});
