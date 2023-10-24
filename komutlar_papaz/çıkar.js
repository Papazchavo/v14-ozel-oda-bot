const { MessageEmbed, Client, ContextMenuInteraction,MessageActionRow,MessageButton,Formatters } = require("discord.js");
const client = global.client;
module.exports = {
    name:"çıkar",
    type: 2,

    /**
 * @param {Client} client
 * @param {ContextMenuInteraction} interaction
 */

    run: async (interaction) => {



        const Guild = interaction.guild;
        let member = Guild.members.cache.get(interaction.targetId)
        if(!member)return interaction.reply({content:`Sunucuda böyle bir kullanıcı bulunmamakta!`,ephemeral:true})
        let data = await client.db.get(`özeloda_${interaction.member.id}`)
        if(!data)return interaction.reply({content:`Odanız bulunmamakta!`,ephemeral:true})
        let channel = Guild.channels.cache.get(data);
        channel.permissionOverwrites.edit(member,{
            SendMessages: false,
            Connect:false,
            ViewChannel:false,
            Stream:false,
            Speak:false
        });
        client.db.pull(`members_${data}`,(element, index, array) => element == member.id, true)
        interaction.reply({content:`${member} adlı kullanıcı başarıyla odanızdan cıkarıldı!`,ephemeral:true})

      
}
};
