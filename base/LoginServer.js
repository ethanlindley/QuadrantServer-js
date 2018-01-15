let WebSocket = require('ws');
let PacketHandler = require('./PacketHandler');

class LoginServer extends PacketHandler
{
    constructor(port)
    {
        super();

        this.port = port;
    }

    startServer()
    {
        let wss = new WebSocket.Server({port: this.port}, this.onStart.bind(this));
        wss.on('connection', this.onConnection.bind(this));
        wss.on('data', this.handleReceivedPacket.bind(this));
    }

    onStart()
    {
        console.log('INFO: LoginServer started on port ' + this.port);
    }

    onConnection(socket)
    {
        console.log('INFO: new connection from ' + socket.remoteAddress);
    }

}

module.exports = LoginServer;
