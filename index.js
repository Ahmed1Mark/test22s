const { DiscordAPIError, MessageSelectMenu, MessageAttachment, MessageButton, MessageActionRow, MessageEmbed, Intents, Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { version } = require("discord.js")
const moment = require('moment');
require("moment-duration-format");
const fs = require('fs');

const {
    token,
    robuxTaxRate,
    prefix
} = require('./config.json')
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ] 
});
 // Declare client to be a new Discord Client (bot)
require('http').createServer((req, res) => res.end(`
Dveloper Bot : Ahmed Clipper
Server Support : https://dsc.gg/clipper-tv
`)).listen(3000) //Dont remove this 
  /*
  Code Below provides info about the bot 
  once it's ready
  */

const Discord = require('discord.js');
const Timers = new Map();
const color = "#0099ff"

//Fix Erorr Project
process.on("uncaughtException" , err => {
return;
})
 
process.on("unhandledRejection" , err => {
return;
})
 
process.on("rejectionHandled", error => {
  return;
});
client.on('ready', () => {
  console.log(``);
  console.log(`</> Logged in as : ${client.user.tag}!`);
  console.log(`</> Servers : ${client.guilds.cache.size}`);
  console.log(`</> Users : ${client.users.cache.size}`);
  console.log(`</> channels : ${client.channels.cache.size}`);
  console.log(`</> Name : ${client.user.username}`);
  client.user.setStatus('idle');///dnd/online/idle
  let status = ['+help', 'dsc.gg/clipper-tv'];
  setInterval(()=>{
  client.user.setActivity(status[Math.floor(Math.random()*status.length)]);
  },5000)
})



//help
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'help') {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("> **The Bot Calculates The Credit Tax**")
      .setDescription(`
🟢\`+ㅤㅤㅤㅤㅤㅤ \`❯ 1. prefix bot
🟢\`botㅤㅤㅤㅤㅤ \`❯ 2. Reply with bot
🟢\`taxㅤㅤㅤㅤㅤ \`❯ 3. Calculates credit tax with broker tax
🟢\`robㅤㅤㅤㅤㅤ \`❯ 4. Calculates robux tax with broker tax
🟢\`userㅤㅤㅤㅤㅤ\`❯ 5. Displays information about the person
🟢\`pingㅤㅤㅤㅤㅤ\`❯ 6. Ping bot displays
🟢\`dailyㅤㅤㅤㅤ \`❯ 7. Daily gift
🟢\`serverㅤㅤㅤㅤ\`❯ 8. View server information
🟢\`avatarㅤㅤㅤㅤ\`❯ 9. View profile picture
🟢\`server-avatar\`❯ 10. Server banner display
🟢\`server-banner\`❯ 12. Show server main image
           `)
    .addFields(
        { name: 'Websit', value: '**__[Click Here](https://pro-tax.netlify.app)__**', inline: true },
        { name: 'Support Server', value: '**__[Click Here](https://dsc.gg/clipper-tv)__**', inline: true },
        { name: 'Developer Bot', value: '<@803873969168973855>', inline: true }
    );

        message.reply({ embeds: [embed] });
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.mentions.has(client.user)) {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Welcome To BOT \`${client.user.username}\``)
        .setDescription('Nice to meet you.')    .addFields(
        { name: 'Prefix Bot', value: '**\` + \`**', inline: true },
        { name: 'Programmed Lang', value: '**\`djs\`**', inline: true },
        { name: 'Developer Bot', value: '**\`@ahm.clipper\`**', inline: true }
    )
        .addFields(
    { name: 'introduction about me', value: 'The purpose of this bot is to streamline the process of calculating taxes on transactions involving Robux and Credits within the digital platform. By automating this task, users can efficiently determine the applicable taxes for their Robux and Credits exchanges, ensuring compliance with financial regulations and facilitating smoother financial management. With its intuitive interface and accurate calculations, this bot simplifies the often complex and time-consuming task of tax assessment, allowing users to focus more on their transactions and less on administrative burdens.' }
)
        .setThumbnail(client.user.displayAvatarURL({ size: 4096 }));

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setURL('https://discord.com/oauth2/authorize?client_id=955250043160518676&permissions=8&scope=bot')
                .setLabel('Invite'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Website')
                .setURL('https://pro-tax.netlify.app'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Twitter')
                .setURL('https://twitter.com/ahm_depression'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Instagram')
                .setURL('https://www.instagram.com/ahm.depression'),
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Support')
                .setURL('https://dsc.gg/clipper-tv')
            );

        await message.reply({ embeds: [embed], components: [row] });
    }
});
//t-value
// استماع للرسائل الجديدة
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'bot') {
        const duration = moment.duration(message.client.uptime).format(" D[d], H[h], m[m]");
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Stats from \`${client.user.username}\``)
            .setDescription(``)
            .addFields(
                { name: ':ping_pong: Ping', value: `┕\`${Math.round(client.ws.ping)}ms\``, inline: true },
                { name: ':file_cabinet: Memory', value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``, inline: true },
                { name: ':homes: Servers', value: `┕\`${client.guilds.cache.size}\``, inline: true },
                { name: ':busts_in_silhouette: Users', value: `┕\`${client.users.cache.size}\``, inline: true },
                { name: ':robot: Version', value: `┕\`v${require("./package.json").version}\``, inline: true },
                { name: ':blue_book: Discord.js', value: `┕\`v${version}\``, inline: true },
                { name: ':green_book: Node', value: `┕\`${process.version}\``, inline: true },
                { name: ':clock1: Uptime', value: `┕\`${duration}\``, inline: true },
                { name: ':control_knobs: API Latency', value: `┕\`${(message.client.ws.ping)}ms\``, inline: true }
            );
        message.reply({ embeds: [embed] });
    }
});








client.setMaxListeners(20);
















//t-value
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 't-value') {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("> **🧮 Tax Value**")
            .setDescription(`1. ${prefix}Tax 1k (K) = 1000 (Thousand) \n2. ${prefix}Tax 1b (B) = 1000000000 (Billion) \n3. ${prefix}Tax 1t (T) = 1000000000000 (Trillion) \n4. ${prefix}Tax 1q (Q) = 1000000000000000 (Quadrillion)`);

        message.reply({ embeds: [embed] });
    }
});

//tax
client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  const command = args.shift().toLowerCase();

  if (command === 'tax' || command === 't') {
    const args2 = args.join(" ").toLowerCase().replace(/k/g, "000").replace(/m/g, "000000").replace(/b/g, "000000000").replace(/t/g, "000000000000").replace(/q/g, "000000000000000");
    const tax = Math.floor(args2 * (20 / 19) + 1);
    const tax2 = Math.floor(tax - args2);
    const tax3 = Math.floor(tax2 * (20 / 19) + 1);
    const tax4 = Math.floor(tax2 + tax3 + args2);

    if (!args2 || isNaN(args2) || args2 < 1) {
      const errorEmbed = new MessageEmbed()
      const embed = new MessageEmbed()
      .setColor("#2c2c34")
      .setDescription(`**⚙️ Please Wait... **`);

const embedMsg = await message.reply({ embeds: [embed] });

setTimeout(() => {
      const taxEmbed = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`**❌ Error**`)
    .setDescription(`\`\`\`Please Write The Amount\`\`\``);
      embedMsg.edit({ embeds: [taxEmbed] });
    }, 1000);
      return message.reply({ embeds: [errorEmbed] });
    }

    const embed = new MessageEmbed()
      .setColor("#2c2c34")
      .setDescription(`**⚙️ Please Wait... **`);
    const embedMsg = await message.reply({ embeds: [embed] });

    setTimeout(() => {
      const taxEmbed = new MessageEmbed()
            .setColor("#43B582")
            .setTitle(`**✅ Final Cost Of __CREDIT__** <:credit:1228573260753539092>`)
            .setFooter({ text: 'calculates credit tax with broker tax' })
            .addFields(
                { name: "1. Amount Total", value: `\`\`\`${tax}\`\`\``, inline: true },
                { name: "2. Amount Tax", value: `\`\`\`${tax2}\`\`\``, inline: false }
        );
      embedMsg.edit({ embeds: [taxEmbed] });
    }, 1000);
  }
});



//daily
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'daily') {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("**> 🎁 Daily Gifts**")
            .addFields(
            { name: '**Daily Probot**', value: '**__[Click Here](https://probot.io/daily)__**', inline: true },
            { name: '**Vote Probot**', value: '**__[Click Here](https://top.gg/bot/probot/vote)__**', inline: true }
            )             

        message.reply({ embeds: [embed] });
    }
});



//ping
client.on("messageCreate", async (black) => {
    if (black.content.startsWith(prefix + "ping")) {
        black.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription("**⚙ Please Wait...**")
            ]
        }).then((m) => {
            setTimeout(() => {
                m.edit({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("> **🤖 Bot Statuss**")
                            .setColor('#0099ff')
                            .addFields(
                            { name: '**📶 My Ping Is**', value: `**__${client.ws.ping}__ms**`, inline: true },
                            { name: '**⌛ TimeDiff**', value: `**__${(Date.now() - black.createdTimestamp)}__ms**`, inline: true }
                            )
                    ]
                });
            }, 1000);
        });
    }
});
 
client.on("messageCreate", async (message) => {
    if (message.content.startsWith(prefix + "server-avatar")) {
        const server = message.guild;
        const serverIcon = server.iconURL({ size: 4096, dynamic: true });

        const serverImageEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Server Image');

        if (serverIcon.endsWith('.gif')) {
            serverImageEmbed.setImage(serverIcon);
        } else {
            serverImageEmbed.setImage(serverIcon);
        }
        
        message.channel.send({ embeds: [serverImageEmbed] });
    }
});
//avatar
client.on("messageCreate", async message => {

    if (message.content.toLowerCase().startsWith(`${prefix}avatar`)) {
        const args = message.content.split(" ");
        const user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author;

        if (args[1] !== "server") {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#0099ff")
                        .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`[**Avatar Link**](${user.displayAvatarURL()})`)
                        .setImage(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
                ]
            });
        } else if (args[1] === "server") {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#0099ff")
                        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                        .setDescription(`[**Avatar Link**](${message.guild.iconURL({ dynamic: true })})`)
                        .setImage(message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
                ]
            });
        }
    }
});



//user
client.on('messageCreate', async message => {
    if (!message.content.toLowerCase().startsWith(prefix + "user")) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'user') {
        if (!message.guild) return;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const user = member.user;
        const joinedDiscord = `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`;
        const joinedServer = `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`;

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('User Info')
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 })) // حجم الصورة: 4096x4096
            .addFields(
                { name: 'Joined Discord:', value: `\`\`\`${moment(user.createdAt).format('YYYY/M/D h:mm:ss')}\`\`\`\n**┕** **${joinedDiscord}**`, inline: true },
                { name: 'Joined Server:', value: `\`\`\`${moment(member.joinedAt).format('YYYY/M/D h:mm:ss')}\`\`\` \n**┕** **${joinedServer}**`, inline: true }
            );

        await message.reply({ embeds: [embed] });
    }
});



client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'rob' || command === 'r') {
        // إذا لم يقم المستخدم بتحديد القيمة
        if (!args[0]) {
            // إرسال رسالة "loading" قبل طلب القيمة
            const loadingEmbed = new MessageEmbed()
                .setColor('#2c2c34')
                .setTitle('**⚙️ Please Wait... **');

            const loadingMsg = await message.reply({ embeds: [loadingEmbed] });

            // تأخير لمدة 3 ثوانٍ قبل إرسال طلب "Please Write The Amount"
            setTimeout(async () => {
                const pleaseWriteEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('**❌ Error!**')
                    .setDescription('\`\`\`Please Write The Amount\`\`\`');

                await loadingMsg.delete(); // حذف رسالة "loading"
                message.reply({ embeds: [pleaseWriteEmbed] }); // إرسال رسالة "Please Write The Amount"
            }, 1000);

            return; // توقف الكود هنا لتجنب استمرار التنفيذ
        }

        const amountStr = args[0].toLowerCase().replace(/k/g, "000").replace(/m/g, "000000").replace(/b/g, "000000000").replace(/t/g, "000000000000").replace(/q/g, "000000000000000");
        const amount = parseInt(amountStr);
        if (isNaN(amount) || amount <= 0) return message.reply('Please provide a valid positive number.');

        const tax = Math.ceil(amount * (robuxTaxRate / 100));
        const total = amount + tax;

        // إرسال رسالة "loading" قبل بدء إنشاء الـ embed
        const loadingEmbed = new MessageEmbed()
            .setColor('#2c2c34')
            .setTitle('**⚙️ Please Wait... **');

        const loadingMsg = await message.reply({ embeds: [loadingEmbed] });

        // تأخير عرض الـ embed لمدة 3 ثواني
        setTimeout(async () => {
            // بناء الـ embed بعد الحصول على البيانات اللازمة
            const embed = new MessageEmbed()
                .setColor('#43B582')
                .setTitle('**✅ Final Cost Of __ROBUX__** <:robux:1228572206989180928>')
                .setFooter({ text: 'calculates robux tax with broker tax' })
                .addFields(
                    { name: '1. Amount Total', value: `\`\`\`${total}\`\`\`` },
                    { name: '2. Amount Tax', value: `\`\`\`${tax}\`\`\`` }
                );

            // تعديل الرسالة السابقة ليعرض الـ embed بعد الانتهاء من حساب الضريبة
            await loadingMsg.edit({ embeds: [embed] });
        }, 1000); // تأخير لمدة 3 ثوانٍ (3000 مللي ثانية)
    }
});



client.on('messageCreate', async message => {
  try {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'server' || command === 'معلومات') {
    const onlineMembers = message.guild.members.cache.filter(m => m.presence?.status === 'online' || m.presence?.status === 'dnd' || m.presence?.status === 'idle').size;
    const textChannels = message.guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT').size;
    const voiceChannels = message.guild.channels.cache.filter(ch => ch.type === 'GUILD_VOICE').size;
    const server = message.guild;

    const serverEmbed = new MessageEmbed()
      .setColor('#2c2c34')
      .setTimestamp()
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .addFields(
        { name: '🆔 Server ID:', value: message.guild.id, inline: true },
        { name: '📆 Created On:', value: message.guild.createdAt.toDateString(), inline: true },
        { name: `👥 Members (${message.guild.memberCount})`, value: `${onlineMembers} online members\n${message.guild.premiumSubscriptionCount} boosts ✨`, inline: true },
        { name: '💬 Channels:', value: `${textChannels} Text | ${voiceChannels} Voice`, inline: true },
        { name: '🌍 Others:', value: `Region: ${message.guild.region}\nVerification Level: ${message.guild.verificationLevel}`, inline: true },
        { name: `🔐 Roles (${message.guild.roles.cache.size})`, value: 'To see a list with all roles use ', inline: true }
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true }));

    message.reply({ embeds: [serverEmbed] });
    }
  } catch (error) {
    console.error('حدث خطأ:', error);
  }
});


client.on("messageCreate", async (message) => {
    if (message.content.startsWith(prefix + "server-banner")) {
        const server = message.guild;

        const serverBanner = server.bannerURL({ size: 4096, dynamic: true });

        const serverBannerEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Server Banner');

        if (serverBanner) {
            serverBannerEmbed.setImage(serverBanner);
        } else {
            serverBannerEmbed.setDescription('This server does not have a banner.');
        }
        
        message.channel.send({ embeds: [serverBannerEmbed] });
    }
});


client.login(token)
