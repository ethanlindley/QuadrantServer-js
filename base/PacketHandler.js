let PacketTypes = require('../util/PacketTypes');

class PacketHandler
{
    constructor()
    {
        this.PacketTypes = new PacketTypes();
    }

    handleReceivedPacket(packet)
    {
        let data = packet.toString();

        if (data.charAt(0) === '<')
        {
            console.log('INFO: XML packet received with data - ' + data);
            data = this.handleXMLPacket(data);
        }
        else if (data.charAt(0) === '%')
        {
            console.log('INFO: RAW packet received with data - ' + data);
            data = this.handleRAWPacket(data);
        }

        return data;
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
    }

    handleRAWPacket(packet)
    {
        // TODO: properly handle RAW packets and send back to client
    }

    checkVersion(packet)
    {
        // TODO: don't hard set version

        let __packet = packet;

        if (__packet.contains('153'))
        {
            __packet = this.PacketTypes.api_OK;
        }
        else
        {
            __packet = this.PacketTypes.api_KO;
        }
        return __packet;
    }

    sendPacket(packet, socket)
    {
        let x = packet.toString();

        socket.write(x);
    }
}

module.exports = PacketHandler;
