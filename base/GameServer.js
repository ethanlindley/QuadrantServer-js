let net = require('net');
let PacketHandler = require('./PacketHandler');

class GameServer
{
    constructor(port)
    {
        this.PacketHandler = new PacketHandler();

        this.port = port;
    }

    startServer()
    {
        let server = net.createServer();

        server.listen(this.port, this.onStart());

        server.on('connection', this.onConnection.bind(this));
    }

    onStart()
    {
        console.log('INFO: GameServer starting on port ' + this.port);
    }

    onConnection(socket)
    {
        console.log('INFO: new connection from ' + socket.remoteAddress);

        let x = socket.on('data', this.PacketHandler.handleReceivedPacket.bind(socket));
        this.PacketHandler.sendPacket(x, socket);
    }
}

module.exports = GameServer;
