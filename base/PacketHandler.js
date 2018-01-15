let PacketTypes = require('../util/PacketTypes');

class PacketHandler extends PacketTypes
{

    constructor(socket)
    {
        super(socket);
    }

    handleReceivedPacket(packet)
    {
        let __packet = packet.toString();

        if (__packet.charAt(0) === '<')
        {
            console.log('INFO: XML packet received with data - ' + __packet);
            __packet = this.handleXMLPacket(__packet);
        }
        else if (__packet.charAt(0) === '%')
        {
            console.log('INFO: RAW packet received with data - ' + __packet);
            __packet = this.handleRAWPacket(__packet);
        }
        return __packet;
    }

    handleXMLPacket(packet)
    {
        switch (packet)
        {
            case this.policy_file_req:
                this.sendPacket(this.policy_file_res);
                break;

            case this.api_verchk:
                let x = this.checkVersion(packet);
                this.sendPacket(x);
                break;
        }
        return packet;
    }

    handleRAWPacket(packet)
    {
        // TODO: properly handle RAW packets and send back to client
    }

    checkVersion(packet)
    {
        // TODO: check client's version and compare with servers, determine whether client can play or not
    }

    sendPacket(packet)
    {
        // TODO: properly send received and handled packets back to the client
    }

}

module.exports = PacketHandler;
