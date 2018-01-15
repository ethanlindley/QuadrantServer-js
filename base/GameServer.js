let net = require('net');
let PacketHandler = require('./PacketHandler');

class GameServer extends PacketHandler
{
    constructor(port)
    {
        super(port);

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

        socket.on('data', this.handleReceivedPacket.bind(socket));
    }

}

module.exports = GameServer;
