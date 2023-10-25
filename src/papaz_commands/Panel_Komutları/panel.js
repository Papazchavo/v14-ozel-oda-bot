const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,StringSelectMenuBuilder,ActivityType } = require("discord.js");
const moment = require("moment")
require('moment-duration-format');
const papaz_config = require("../../../papaz_config.json")
module.exports = {
name: "panel",
aliases: ["panel"],
execute: async (client, message, args, papaz_embed) => {     

    const papazbutton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('oda-oluştur')
            .setLabel(`Oluştur`)
            .setStyle('Secondary'))
            
let Papaz = new EmbedBuilder()
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`\`${message.guild.name}\` Sunucusunun Özel Oda sistemine hoşgeldinAşağıdaki butonlar yardımıyla yeni bir özel oda oluşturabilirsin.
Adınıza açılan sohbet kanalından özel ayarlar paneline ulabilirsiniz?`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `Oda Oluşturma Paneli Size Metin Özel Mesaj Olarak Atacaktır!` });

message.channel.send({ embeds: [Papaz] ,components:[papazbutton]})
message.delete();

}}
