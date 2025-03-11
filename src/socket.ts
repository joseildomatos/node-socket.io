const io = require('socket.io')();
io.set('origins', '*:*');

io.on('connection', (socket) => {
     var notifCliente = socket.handshake.query.usuario == undefined ? '' : socket.handshake.query.usuario;
     var rotina = socket.handshake.query.rotina == undefined ? '' : socket.handshake.query.rotina;
     console.log('Cliente Socket conectado...' + notifCliente + '  |  Rotina: ' + rotina);

     //@@@@@@@@@@@@@@@@@@@@@@@@@@ rotinas para recepcao dos web servioces - chamada web/app - cliente @@@@@@@@@@@@@@@@@@@@@@@2
     // monitoramentos - ouvintes - global
     socket.on('MonitorGlobal', (msg) => {
          socket.broadcast.emit('MonitorGlobal', msg);
     });
     // monitoramentos - ouvintes - email
     socket.on('MonitorEmail', (msg) => {
          socket.broadcast.emit('MonitorEmail', msg);
     });
     // monitoramentos - ouvintes - mwensageiro
     socket.on('MonitorMensageiro', (msg) => {
          socket.broadcast.emit('MonitorMensageiro', msg);
     });
     // monitoramentos - ouvintes - padioleiro
     socket.on('MonitorPadioleiro', (msg) => {
          socket.broadcast.emit('MonitorPadioleiro', msg);
     });
     socket.on('MonitorTotem', (msg) => {
          socket.broadcast.emit('MonitorTotem', msg);
     });

     //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ rotinas para os ouvintes @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
     // metodos - ouvintes
     socket.on('Escrevendo', (msg) => {
          socket.broadcast.emit('escrevendo', msg);
     });
     socket.on('DesconexaoManual', (msg) => {
          var notifCliente = { "request_cliente": JSON.parse(JSON.stringify(msg)) };
          socket.broadcast.emit('MonitorNotificacao', notifCliente);
     });
     socket.on('disconnect', () => {
          //console.log("disconnect => socket.handshake.query.usuario " + socket.handshake.query.usuario);
          console.log('Cliente Socket desconectado...' + notifCliente + '  |  Rotina: ' + rotina);
          socket.broadcast.emit('MonitorNotificacao', 'disconnect => socket.handshake.query.usuario ' + notifCliente + '  |  Rotina: ' + rotina);
     });
});

export default io;
