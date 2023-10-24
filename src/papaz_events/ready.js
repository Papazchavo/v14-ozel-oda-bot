const papaz_config = require("../../papaz_config.json");
const { joinVoiceChannel } = require("@discordjs/voice");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client;
module.exports = () => {

client.user.setPresence({activities:[{name:`Created by Papaz`,type: ActivityType.Streaming,url:"https://www.twitch.tv/Papaz"}], status: "dnd" });
const papaz_kanal = client.channels.cache.get(papaz_config.voiceChannel);
if(!papaz_kanal)return
joinVoiceChannel({channelId: papaz_kanal.id,guildId: papaz_kanal.guild.id,adapterCreator: papaz_kanal.guild.voiceAdapterCreator,selfDeaf: true,selfMute:true});



const guild = client.guilds.cache.get(papaz_config.sunucuID)
setInterval(function(){
guild.channels.cache.forEach(async channel => {
if (channel.name.startsWith('#')) {
    let channeldata = client.db.get(`${channel.id}`)
    if(!channeldata)return;
    let member = guild.members.cache.get(channeldata)
    let data = client.db.get(`özeloda_${channeldata}`)
    if(!data)return;
    if (channel.members.size == 0) {
    channel.delete()
    client.db.delete(`members_${channel.id}`)
    client.db.delete(`özeloda_${channeldata}`)
    client.db.delete(`${channel.id}`)
    }
}
})
},papaz_config.odaSure)


}
module.exports.conf = {
name: "ready"
}
