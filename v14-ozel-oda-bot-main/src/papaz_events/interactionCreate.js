const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,TextInputStyle,ModalBuilder,PermissionFlagsBits,ChannelType,permissionOverwrites} = require("discord.js");
const papaz_config = require("../../papaz_config.json")
module.exports = async button => {
 let value = button.customId;
 if(button.isButton()){

if(value == "oda-oluştur"){
    let data = client.db.get(`özeloda_${button.member.id}`)
    if(data)return button.reply({content:`Zaten Odanız Bulunmakta!`,ephemeral:true})

    const papazModal = new ModalBuilder()
    .setCustomId('oda-create')
    .setTitle("Özel Oda Oluştur")

     let odaisim = new TextInputBuilder()
    .setCustomId('oda-adı')
    .setPlaceholder(`Papaz Secret Room`)
    .setLabel("Odanızın Adı Ne Olsun?")
    .setStyle(TextInputStyle.Short)
    .setMinLength(2)
    .setMaxLength(10)
    .setRequired(true)
     let odalimit = new TextInputBuilder()
    .setCustomId('oda-limit')
    .setPlaceholder('(1 - 99)')
    .setLabel("Odanız Kaç Kişilik Olsun?")
    .setStyle(TextInputStyle.Short)
    .setMinLength(1)
    .setMaxLength(2)
    .setRequired(true)
     
    const name = new ActionRowBuilder().addComponents(odaisim);
	const limit = new ActionRowBuilder().addComponents(odalimit);
    papazModal.addComponents(name,limit);

await button.showModal(papazModal);

}else if(value == "user-ekle"){
let data = client.db.get(`özeloda_${button.member.id}`)
if(!data)return button.reply({content:`Odanız bulunmamakta!`,ephemeral:true})

const papazModal = new ModalBuilder()
    .setCustomId('user-add')
    .setTitle("Özel Oda Sistemi")

     let kisi = new TextInputBuilder()
    .setCustomId('kisi')
    .setPlaceholder(`1143638421257072661`)
    .setLabel("Bir Kullanıcı ID'si Belirtin")
    .setStyle(TextInputStyle.Short)
    .setMinLength(5)
    .setMaxLength(25)
    .setRequired(true)
     
    const kisirow = new ActionRowBuilder().addComponents(kisi);
    papazModal.addComponents(kisirow);

await button.showModal(papazModal);

}else if(value == "user-cıkar"){
    let data = client.db.get(`özeloda_${button.member.id}`)
    if(!data)return button.reply({content:`Odanız Bulunmamakta!`,ephemeral:true})
    
    const papazModal = new ModalBuilder()
        .setCustomId('user-substr')
        .setTitle("Özel Oda Sistemi")
    
         let kisi = new TextInputBuilder()
        .setCustomId('kisi')
        .setPlaceholder(`1143638421257072661`)
        .setLabel("Kullanıcı ID'si Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(25)
        .setRequired(true)
         
        const kisirow = new ActionRowBuilder().addComponents(kisi);
        papazModal.addComponents(kisirow);
    
    await button.showModal(papazModal);
    
    }else if(value == "oda-bilgi"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`Odanız Bulunmamakta!`,ephemeral:true})
        
        let channel = button.guild.channels.cache.get(data)
        let users = client.db.get(`members_${data}`)
           
button.reply({content:
`\`\`\`fix
 ${users ? users.map((papaz,n) => `${n+1}).${button.guild.members.cache.get(papaz).user.tag}`).join(", ") : "Bulunamadı"}
\`\`\``,ephemeral:true})
        }else if(value == "oda-isim"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`Odanız Bulunmamakta!`,ephemeral:true})
        
        const papazModal = new ModalBuilder()
        .setCustomId('oda-name')
        .setTitle("Özel Oda Sistemi")
    
         let odaisim = new TextInputBuilder()
        .setCustomId('oda-adı')
        .setPlaceholder(`Papaz Secret Room`)
        .setLabel("Oda Adı Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(2)
        .setMaxLength(10)
        .setRequired(true)

        const name = new ActionRowBuilder().addComponents(odaisim);
        papazModal.addComponents(name);
        await button.showModal(papazModal);

    }else if(value == "oda-sil"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`Bir Özel Odan Bulunmamakta!`,ephemeral:true})
        let channel = button.guild.channels.cache.get(data);
        button.reply({content:`Özel Odanız Siliniyor.`,ephemeral:true})
        channel.delete({reason:`Oda Sahibi Tarafından Silindi`})
        client.db.delete(`members_${data}`)
        client.db.delete(`${data}`)
        client.db.delete(`özeloda_${button.member.id}`)
    }else if(value == "sesten-at"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`Odanız Bulunmamakta!`,ephemeral:true})

        const papazModal = new ModalBuilder()
        .setCustomId('user-dis')
        .setTitle("Özel Oda Sistemi")
    
         let kisi = new TextInputBuilder()
        .setCustomId('kisi')
        .setPlaceholder(`1143638421257072661`)
        .setLabel("Kullanıcı ID'si Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(25)
        .setRequired(true)
         
        const kisirow = new ActionRowBuilder().addComponents(kisi);
        papazModal.addComponents(kisirow);
        await button.showModal(papazModal);
    }else if(value == "oda-kilit"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`Odanız Bulunmamakta!`,ephemeral:true})
            let channel = button.guild.channels.cache.get(data);
            channel.permissionOverwrites.edit(button.guild.roles.everyone,{
                Connect:false,
                SendMessages:false,
                ViewChannel:false,
                Stream:false,
                Speak:false
            });
            button.reply({content:`Odanız Başarıyla Herkese Kapatıldı!`,ephemeral:true})
        }else if(value == "oda-herkes"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`Odanız Bulunmamakta!`,ephemeral:true})
            let channel = button.guild.channels.cache.get(data);
            channel.permissionOverwrites.edit(button.guild.roles.everyone,{
                Connect:true,
                SendMessages:false,
                ViewChannel:true,
                Stream:true,
                Speak:true
            });
            button.reply({content:`Odanız Başarıyla Herkese Açıldı!`,ephemeral:true})
        }else if(value == "oda-limit"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`Odanız Bulunmamakta!`,ephemeral:true})

            const papazModal = new ModalBuilder()
            .setCustomId('oda-sayı')
            .setTitle("Özel Oda Sistemi")
        
             let kisi = new TextInputBuilder()
            .setCustomId('limit')
            .setPlaceholder(`Limiti Giriniz (1-99)`)
            .setLabel("Bir Oda Limiti Belirtin")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true)
             
            const kisirow = new ActionRowBuilder().addComponents(kisi);
            papazModal.addComponents(kisirow);
            await button.showModal(papazModal);
        }

}



if(button.isModalSubmit()){

if(value == "oda-create"){
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
                    .setLabel(`Oda Üyeleri`)
                    .setStyle('Primary'))
var name = button.fields.getTextInputValue('oda-adı');
var limit = button.fields.getTextInputValue('oda-limit');

if(isNaN(limit)) limit = 1;
if(limit < 0) limit = 0;
if(limit > 99) limit = 99;

button.guild.channels.create({
        name: `${name}`,
        type: ChannelType.GuildVoice,
        parent: papaz_config.kategoriID,
        userLimit: limit,
        permissionOverwrites: [{id: button.member.id,
        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak],
        deny: [PermissionFlagsBits.SendMessages]
        }, 
        {
        id: button.guild.id,
        deny: [PermissionFlagsBits.SendMessages,PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }]
    }).then(async (papaz) => {
        let invite = await papaz.createInvite({maxUses: 1});
        await button.reply({content:`Odanız Başarıyla Açıldı!`,ephemeral:true})
        await client.db.set(`özeloda_${button.member.id}`,`${papaz.id}`)
        await client.db.set(`${papaz.id}`,`${button.member.id}`)
        await client.db.push(`members_${papaz.id}`,button.member.id)
        await client.channels.cache.find(x => x.name == `${name}`).send({content:`<@${button.member.id}> Selam, özel odanı bu butonlardan yönetebilirsin.`,components:[papazbutton,papazbutton2,papazbutton3]})
        })

}else if(value == "user-add"){
    var userID = button.fields.getTextInputValue('kisi');
    let member = button.guild.members.cache.get(userID)
    if(!member)return button.reply({content:`> **Sunucuda Böyle Bir Kullanıcı Bulunmamakta!**`,ephemeral:true})
    let data = await client.db.get(`özeloda_${button.member.id}`)
    let channel = button.guild.channels.cache.get(data);
    channel.permissionOverwrites.edit(member,{
        Connect:true,
        ViewChannel:true,
        Stream:true,
        Speak:true
    });
    let invite = channel.createInvite({maxUses: 1});
    member.user.send({content:`> **${button.user.username} Kullanıcısı Seni Özel Odasına Ekledi!**\n> **Odaya Katıl;** ${invite.code}`}).catch(e => { });
    client.db.push(`members_${data}`,member.id)
    button.reply({content:`> **${member} Kullanıcısı Kanala Başarıyla Eklendi!**`,ephemeral:true})

}else if(value == "user-substr"){
    var userID = button.fields.getTextInputValue('kisi');
    let member = button.guild.members.cache.get(userID)
    if(!member)return button.reply({content:`> **Sunucuda Böyle Bir Kullanıcı Bulunmamakta!**`,ephemeral:true})
    let data = await client.db.get(`özeloda_${button.member.id}`)
    let channel = button.guild.channels.cache.get(data);
    channel.permissionOverwrites.edit(member,{
        Connect:false,
        ViewChannel:false,
        Stream:false,
        Speak:false
    });
    client.db.pull(`members_${data}`,(element, index, array) => element == member.id, true)
    button.reply({content:`> **${member} Kullanıcısı Kanaldan Başarıyla Çıkartıldı!**`,ephemeral:true})
}else if(value == "oda-name"){
    var isim = button.fields.getTextInputValue('oda-adı');
    let data = await client.db.get(`özeloda_${button.member.id}`)
    button.guild.channels.edit(data,{name:`#${isim}`});
    button.reply({content:`> **Oda Adı Başarıyla \`${isim}\` Olarak Değiştirildi!**`,ephemeral:true})
}else if(value == "user-dis"){
    let data = client.db.get(`özeloda_${button.member.id}`)
    var kisi = button.fields.getTextInputValue('kisi');
    let channel = button.guild.channels.cache.get(data);
    button.guild.members.fetch(kisi).then(papaz => {
    if (papaz.voice.channel.id !== channel.id) return button.reply({content:`> **Belirtilen Üye Özel Oda Kanalında Bulunmamakta!**`, ephemeral:true })
    button.reply({content:`> **${papaz} Ses Kanalından Başarıyla Atıldı!**`, ephemeral: true })
    papaz.voice.disconnect()
    }, err => { button.reply({content:`> **Böyle Bir Kullanıcı Bulunmamakta!**`,ephemeral:true})})
    }else if(value == "bit-hız"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        var bit = button.fields.getTextInputValue('bit');
        if(isNaN(bit))bit = 96;
        if(bit > 96) bit = 96;
        if(bit < 8) bit = 8;
        let channel = button.guild.channels.cache.get(data);
        channel.setBitrate(bit + `_000`)
        button.reply({content:`> **Özel Odanın Bit Hızı Başarıyla \`${bit}\` Olarak Ayarlandı!**`,ephemeral:true})
        }else if(value == "oda-sayı"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            var sayı = button.fields.getTextInputValue('limit');
            if(isNaN(sayı))sayı = 99;
            if(sayı > 99) sayı = 99;
            if(sayı < 0) sayı = 0;
            let channel = button.guild.channels.cache.get(data);
            channel.setUserLimit(sayı)
            button.reply({content:`> **Özel Odanın Kişi Sayısı Başarıyla \`${sayı == 0 ? "Sınırsız": sayı}\` Olarak Ayarlandı!**`,ephemeral:true})
            }



}

}

module.exports.conf = {
name: "interactionCreate"
}
