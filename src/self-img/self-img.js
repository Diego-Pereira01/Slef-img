const imports = require('../exports/bbt_node')

const idServidor = '1137539406144741419'; // Substitua pelo ID do servidor de destino
const idChat = '1180222962658447480'; // Substitua pelo ID do canal de destino

function inportmassageCreate(client) {
    // Verifica e cria o diretório 'img' se ele não existir
    const imgDirectory = imports.path.join(__dirname, '../img');
    if (!imports.fs.existsSync(imgDirectory)) {
        imports.fs.mkdirSync(imgDirectory);
    }

    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        try {
            if (message.guild.id !== idServidor && message.attachments.size > 0) {
                const attachment = message.attachments.first();

                if (attachment.contentType.includes("image")) {
                    const response = await imports.fetch(attachment.url);
                    if (!response.ok) {
                        console.error(`Erro ao buscar a imagem de ${message.author.tag}: ${response.statusText}`);
                        return;
                    }

                    const buffer = await response.buffer();

                    // Cria um nome de arquivo único para a imagem
                    const timestamp = Date.now();
                    const fileName = `${timestamp}_${attachment.name}`;

                    // Salva a imagem no diretório 'img'
                    const filePath = imports.path.join(imgDirectory, fileName);
                    imports.fs.writeFileSync(filePath, buffer);

                    const originGuildName = message.guild.name;

                    const targetGuild = client.guilds.cache.get(idServidor);
                    if (!targetGuild) {
                        console.error(`Servidor de destino não encontrado.`);
                        return;
                    }

                    const targetChannel = targetGuild.channels.cache.get(idChat);
                    if (!targetChannel || targetChannel.id !== idChat) {
                        console.error(`Canal de destino não encontrado.`);
                        return;
                    }
                    await targetChannel.send({
                        files: [filePath],
                        content: `Imagem enviada por <@${message.author.id}>  \nServidor: \`${originGuildName}\``,
                    });

                    setTimeout(() => {
                        imports.fs.unlinkSync(filePath);
                        console.log(`Imagem ${fileName} apagada após 1 segundo.`);
                    }, 1000);
                }
            }
        } catch (error) {
            console.error(`Ocorreu um erro: ${error}`);
        }
    })
};
module.exports = inportmassageCreate;
