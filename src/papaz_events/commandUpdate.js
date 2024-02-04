const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const papaz_config = require("../../papaz_config.json");
const ms = require('ms');
module.exports = async (oldMessage,newMessage) => {
if (papaz_config.prefix && !newMessage.content.startsWith(papaz_config.prefix)) return;
const args = newMessage.content.slice(1).trim().split(/ +/g);
const commands = args.shift().toLowerCase();
const cmd = client.commands.get(commands) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(commands));
const papaz_embed = new EmbedBuilder().setColor(`#2f3136`).setAuthor({name: newMessage.member.displayName, iconURL: newMessage.author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: papaz_config.clientPresence ? papaz_config.clientPresence : `papaz Was Here` , iconURL: message.author.avatarURL({ dynamic: true, size: 2048 })})
if (cmd) {
cmd.execute(client, newMessage, args, papaz_embed)} }
module.exports.conf = {name: "messageUpdate"}
