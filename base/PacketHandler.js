let PacketTypes = require('../util/PacketTypes');

class PacketHandler
{

    constructor()
    {
        this.PacketTypes = new PacketTypes();
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
            case this.PacketTypes.policy_file_req:
                this.sendPacket(this.PacketTypes.policy_file_res);
                break;

            case this.PacketTypes.api_verchk:
                let x = this.checkVersion(packet);
                this.sendPacket(x);
                break;
            default:
                console.log('INFO: rogue packet received with data - ' + packet);
        }
        return packet;
    }

    handleRAWPacket(packet)
    {
        // TODO: properly handle RAW packets and send back to client
    }

    checkVersion(packet)
    {
        // TODO: don't hard set version

        let __packet = packet;

        if (packet.contains('153'))
        {
            __packet = this.PacketTypes.api_OK;
        }
        else
        {
            __packet = this.PacketTypes.api_KO;
        }
        return __packet;
    }

    sendPacket(packet)
    {
        // TODO: properly send received and handled packets back to the client
    }

}

module.exports = PacketHandler;
