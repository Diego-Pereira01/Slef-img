const _new = require('../exports/bbt_node')

function entradaCall(client) {
    client.on("ready", () => {
        // Array de IDs de canais possíveis
        const idsCanais = [_new.botcall.id1];
        // Encontrar o primeiro canal disponível
        let canal;
        for (const id of idsCanais) {
            canal = client.channels.cache.get(id);
            if (canal) {
                break; // Sair do loop se um canal for encontrado
            }
        }
        // Verificar se algum canal foi encontrado
        if (canal) {
            _new.joinVoiceChannel({
                channelId: canal.id,
                guildId: canal.guild.id,
                adapterCreator: canal.guild.voiceAdapterCreator,
            });
        } else {
            console.log(" ❌ | Não foi possível encontrar um canal de voz válido.");
        }
    })
} 
module.exports = entradaCall;