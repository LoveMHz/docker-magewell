import http from 'http';
import WebSocket from 'ws';

if(process.argv.length < 3) {
  console.log('Usage: node websocket-relay.js <secret> [<stream-port> <websocket-port>]');
  process.exit();
}

const STREAM_SECRET  = process.argv[2];
const STREAM_PORT    = parseInt(process.argv[3]) || 3206;
const WEBSOCKET_PORT = parseInt(process.argv[4]) || 3202;

// Websocket Server
const socketServer = new WebSocket.Server({ port: WEBSOCKET_PORT, perMessageDeflate: false });

socketServer.on('connection', (socket, request) => {
  console.log(
    'New WebSocket Connection: ',
    request.socket.remoteAddress,
    request.headers['user-agent'],
    `(${socketServer.clients.size} total)`
  );

  socket.on('close', (_code, _message) => {
    console.log(`Disconnected WebSocket (${socketServer.clients.size} total)`);
  });
});

// HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
const streamServer = http.createServer((request, response) => {
  const params = (request.url || '').substr(1).split('/');

  if(params[0] !== STREAM_SECRET) {
    console.log(`Failed Stream Connection: ${request.socket.remoteAddress}:${request.socket.remotePort} - wrong secret.`);
    response.end();
  }

  response.connection.setTimeout(0);
  console.log(`Stream Connected: ${request.socket.remoteAddress}:${request.socket.remotePort}`);

  request.on('data', (data) => {
    socketServer.clients.forEach(function each(client) {
      if(client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  request.on('end', () => {
    console.log('close');
  });
}).listen(STREAM_PORT);

console.log(`Listening for incomming MPEG-TS Stream on http://127.0.0.1:${STREAM_PORT}/<secret>`);
console.log(`Awaiting WebSocket connections on ws://127.0.0.1:${WEBSOCKET_PORT}/`);
