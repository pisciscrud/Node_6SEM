const crypto = require('crypto');

class ServerDH
{
    constructor(lengthA, g)
    {
        const DiffieHellman = crypto.createDiffieHellman(lengthA, g);
        const p = DiffieHellman.getPrime();
        const gb = DiffieHellman.getGenerator();
        const k = DiffieHellman.generateKeys();
        this.getContext = () =>
        {
            return {
                p_hex: p.toString('hex'),
                g_hex: gb.toString('hex'),
                key_hex: k.toString('hex')
            };
        };
        this.getSecret = (clientContext) => {
            const k = Buffer.from(clientContext.key_hex, 'hex');
            return DiffieHellman.computeSecret(k);
        };
    }
}

class ClientDH {
    constructor(serverContext)
    {
        const ctx = {
            p_hex: serverContext.p_hex ? serverContext.p_hex : '1111',
            g_hex: serverContext.g_hex ? serverContext.g_hex : '1',
        };
        const p = Buffer.from(ctx.p_hex, 'hex');
        const g = Buffer.from(ctx.g_hex, 'hex');
        const dh = crypto.createDiffieHellman(p, g);
        const k = dh.generateKeys();
        this.getContext = () =>
        {
            return {
                p_hex: p.toString('hex'),
                g_hex: g.toString('hex'),
                key_hex: k.toString('hex')
            };
        };
        this.getSecret = (serverContext) =>
        {
            const k = Buffer.from(serverContext.key_hex, 'hex');
            return dh.computeSecret(k);
        };
    }
}

module.exports.ServerDH = ServerDH;
module.exports.ClientDH = ClientDH;