class PacketTypes
{
    constructor()
    {
        // let's define some of our packets
        this.policy_file_req = "<policy-file-request/>\0";
        this.policy_file_res = "<cross-domain-policy><allow-access-from domain='*' to-ports='*'/></cross-domain-policy>\0";

        this.api_verchk = "";
        this.api_OK = "";
        this.api_KO = "";
    }
}

module.exports = PacketTypes;
