const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,ChannelType,PermissionFlagsBits } = require("discord.js");
const papaz_config = require("../../papaz_config.json")
module.exports = async (oldpapaz,newpapaz) => {
if(!newpapaz.channel)return;

let channel = client.guilds.cache.get(papaz_config.sunucuID).channels.cache.get(newpapaz.channelId);
if(channel.parentId == papaz_config.kategoriID){
let data = client.db.get(`members_${newpapaz.channel.id}`)
if(!data)return;
if(data.some(papaz => papaz.includes(newpapaz.member.id)))return;
newpapaz.member.voice.disconnect();
}else return

}
module.exports.conf = {
name: "voiceStateUpdate"
}
