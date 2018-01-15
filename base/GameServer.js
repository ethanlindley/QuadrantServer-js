let wss = require('ws');

class GameServer
{
    constructor(port)
    {
        this.port = port;
    }

    startServer()
    {
        let s = new wss.Server({ port: this.port }, this.onStart.bind(this));
        s.on('connection', this.onConnection.bind(this));
    }

    onStart()
    {
        console.log('INFO: GameServer starting on port ' + this.port);
    }

    onConnection(ws)
    {
        let client = ws.remoteAddress;
        console.log('INFO: new connection from ' + client);
    }

}

module.exports = GameServer;
