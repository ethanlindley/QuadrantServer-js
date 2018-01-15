let ls = require('./base/LoginServer');
let gs = require('./base/GameServer');

let loginServer = new ls(6112);
let gameServer = new gs(6113);

loginServer.startServer();
//gameServer.startServer();

process.on('uncaughtException',
    function(err)
    {
      console.log(err);
    }
);
