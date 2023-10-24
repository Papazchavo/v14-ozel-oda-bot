const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,ChannelType,PermissionFlagsBits } = require("discord.js");
const papaz_config = require("../../papaz_config.json")
module.exports = async (oldpapaz,newpapaz) => {
    const papazbutton = new ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setEmoji('1165182160144187412')
    .setCustomId('user-ekle')
    .setLabel(`User Ekle`)
    .setStyle('Secondary'),
    new ButtonBuilder()
    .setEmoji('1165182156855848990')
    .setCustomId('user-cıkar')
    .setLabel(`User Çıkar`)
    .setStyle('Secondary'),
    new ButtonBuilder()
    .setEmoji('1165190593815789628')
    .setCustomId('oda-isim')
    .setLabel(`Oda Adı Değiştir`)
    .setStyle('Secondary'),
    new ButtonBuilder()
    .setEmoji('1165182151256444998')
    .setCustomId('oda-sil')
    .setLabel(`Özel Odanı Sil`)
    .setStyle('Secondary'))
    const papazbutton2 = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setEmoji('1165182149767467119')
            .setCustomId('oda-kilit')
            .setLabel(`Odayı Kilitle`)
            .setStyle('Secondary'),
            new ButtonBuilder()
            .setEmoji('👥')
            .setCustomId('oda-limit')
            .setLabel(`Oda Limiti Değiştir`)
            .setStyle('Secondary'),
            new ButtonBuilder()
            .setEmoji('1165190717136711773')
            .setCustomId('sesten-at')
            .setLabel(`Sesten At`)
            .setStyle('Secondary'),
            new ButtonBuilder()
            .setEmoji('1165182146978254878')
            .setCustomId('oda-herkes')
            .setLabel(`Odayı Herkese Aç`)
            .setStyle('Secondary'))

            const papazbutton3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji('❓')
                    .setCustomId('oda-bilgi')
                    .setLabel(`Oda Bilgisi`)
                    .setStyle('Primary'))

let data = client.db.get(`özeloda_${newpapaz.member.id}`)
if(newpapaz.channelId == papaz_config.odaOlusturID){
    if(!data){
    let odaisim = newpapaz.member.displayName.length > 10 ? newpapaz.member.displayName.substring(0, 10).trim() + ".." : newpapaz.member.displayName;
    newpapaz.guild.channels.create({
        name: `${odaisim}`,
        type: ChannelType.GuildVoice,
        parent: papaz_config.kategoriID,
        userLimit: 1,
        permissionOverwrites: [{id: newpapaz.member.id,
        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak],
        deny: [PermissionFlagsBits.SendMessages]
        }, 
        {
        id: newpapaz.guild.id,
        deny: [PermissionFlagsBits.SendMessages,PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }]
    }).then(async(papaz) => { 

    await newpapaz.member.voice.setChannel(papaz.id)
    await client.db.set(`özeloda_${newpapaz.member.id}`,papaz.id)
    await client.db.set(`${papaz.id}`,`${newpapaz.member.id}`)
    await client.db.push(`members_${papaz.id}`,newpapaz.member.id)
    await client.channels.cache.find(x => x.name == `${odaisim}`).send({content:`<@${newpapaz.member.id}> Selam, özel odanı bu butonlardan yönetebilirsin.`,components:[papazbutton,papazbutton2,papazbutton3]})
    })
    }else{
    let channel = newpapaz.guild.channels.cache.get(data);
    if(!channel)return;
    newpapaz.member.voice.setChannel(channel.id);
    }
}

}
module.exports.conf = {
name: "voiceStateUpdate"
}
