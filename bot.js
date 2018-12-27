const Discord = require('discord.js');
const moment = require("moment");  
const fs = require("fs");      
const dateFormat = require('dateformat');
const client = new Discord.Client(); 
const Canvas = require("canvas"); //npm i canvas
const prefix = "-"
let profile = JSON.parse(fs.readFileSync("profile.json", "utf8"))

client.on('ready', () => {
    client.user.setGame('www.NextaHost.com','https://www.twitch.tv/RezfixServer');
      console.log('NextaHost');
      console.log(`Logged in as * [ " ${client.user.username} " ] servers! [ " ${client.guilds.size} " ]`);
      console.log(`Logged in as * [ " ${client.user.username} " ] Users! [ " ${client.users.size} " ]`);
      console.log(`Logged in as * [ " ${client.user.username} " ] channels! [ " ${client.channels.size} " ]`);
  });

//AutoRole

client.on('guildMemberAdd', (member) => {
  member.addRole(member.guild.roles.find('name', 'Member.'));
  });	

//Report

client.on('message', function(message) {
  if(message.content.startsWith(prefix + "report")) {
      let messageArgs = message.content.split(" ").slice(1).join(" ");
      let messageReason = message.content.split(" ").slice(2).join(" ");
      if(!messageReason) return message.reply("**# Specify a reason!**");
  let mUser = message.mentions.users.first();
  if(!mUser) return message.channel.send("Couldn't find user.");
  let Rembed = new Discord.RichEmbed()
  .setTitle("`New Report!`")
  .setThumbnail(message.author.avatarURL)
  .addField("**# - Reported User:**",mUser,true)
  .addField("**# - Reported User ID:**",mUser.id,true)
  .addField("**# - Reason:**",messageReason,true)
  .addField("**# - Channel:**",message.channel,true)
  .addField("**# - Time:**",message.createdAt,true)
  .setFooter("لو ان الابلاغ فيه مزح راح يتعرض صاحب الابلاغ لقوبات")
message.channel.send(Rembed)
message.channel.send("__Are you sure you want to send this to the Server owner??__").then(msg => {
  msg.react("✅")
  msg.react("❌")
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
  message.guild.owner.send(Rembed)
  message.reply("**# - Done! 🎇**");
})
reaction2.on("collect", r => {
  message.reply("**# - Canceled!**");
})
})
}
});

//Tickiet

client.on("message", (message) => {
  /// ALPHA CODES
 if (message.content.startsWith("-new")) {     /// ALPHA CODES
      const reason = message.content.split(" ").slice(1).join(" ");     /// ALPHA CODES
      if (!message.guild.roles.exists("name", "Support.")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
      if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// ALPHA CODES
      message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
          let role = message.guild.roles.find("name", "Support.");
          let role2 = message.guild.roles.find("name", "@everyone");
          c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });    /// ALPHA CODES
          c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
          });
          c.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
          const embed = new Discord.RichEmbed()
              .setColor(0xCF40FA)
              .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`)
              .setTimestamp();
          c.send({
              embed: embed
          });
      }).catch(console.error);
  }


if (message.content.startsWith("-close")) {
      if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

     message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`#confirm\`. This will time out in 10 seconds and be cancelled.`)
         .then((m) => {
             message.channel.awaitMessages(response => response.content === '#confirm', {
                     max: 1,
                     time: 10000,
                     errors: ['time'],
                 })    /// ALPHA CODES
                 .then((collected) => {
                     message.channel.delete();
                 })    /// ALPHA CODES
                 .catch(() => {
                     m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                         m2.delete();
                     }, 3000);
                 });
         });
 }

});

//Links

client.on('message', message => {
  if(message.content.includes('discord.gg')){
                                          if(!message.channel.guild) return message.reply('** ممنوع نشر الروابط 🤔   **');
      if (!message.member.hasPermissions(['ADMINISTRATOR'])){
      message.delete()
  return message.reply(`** ممنوع نشر الروابط :angry: ! **`)
  }
}
});

//Bans

client.on('message', message => {
  if (message.content.startsWith("-bans")) {
      message.guild.fetchBans()
      .then(bans => message.channel.send(`${bans.size} عدد اشخاص المبندة من السيرفر `))
.catch(console.error);
}
});

//Kick

client.on('message', message => {
	var prefix = "-"
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .kickable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");

  message.guild.member(user).kick();

  const kickembed = new Discord.RichEmbed()
  .setAuthor(`KICKED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : kickembed
  })
}
});

//Ban

client.on('message', message => {
	var prefix = "-"
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  /*let b5bzlog = client.channels.find("name", "5bz-log");
  if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if(!reason) return message.reply ("**اكتب سبب الطرد**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");

  message.guild.member(user).ban(7, user);

  const banembed = new Discord.RichEmbed()
  .setAuthor(`BANNED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : banembed
  })
}
});

//Thanks-Bot

client.on('guildCreate', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
  .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك https://discord.gg/tgkBmG**`)
      guild.owner.send(embed)
});

//Mute UnMute

client.on('message', async message =>{
  if (message.author.boss) return;
	var prefix = "-";

if (!message.content.startsWith(prefix)) return;
	let command = message.content.split(" ")[0];
	 command = command.slice(prefix.length);
	let args = message.content.split(" ").slice(1);
	if (command == "mute") {
		if (!message.channel.guild) return;
		if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("انت لا تملك صلاحيات !! ").then(msg => msg.delete(5000));
		if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("البوت لايملك صلاحيات ").then(msg => msg.delete(5000));;
		let user = message.mentions.users.first();
		let muteRole = message.guild.roles.find("name", "Muted");
		if (!muteRole) return message.reply("** لا يوجد رتبة الميوت 'Muted' **").then(msg => {msg.delete(5000)});
		if (message.mentions.users.size < 1) return message.reply('** يجب عليك المنشن اولاً **').then(msg => {msg.delete(5000)});
		let reason = message.content.split(" ").slice(2).join(" ");
		message.guild.member(user).addRole(muteRole);
		const muteembed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`Muted!`, user.displayAvatarURL)
		.setThumbnail(user.displayAvatarURL)
		.addField("**:busts_in_silhouette:  المستخدم**",  '**[ ' + `${user.tag}` + ' ]**',true)
		.addField("**:hammer:  تم بواسطة **", '**[ ' + `${message.author.tag}` + ' ]**',true)
		.addField("**:book:  السبب**", '**[ ' + `${reason}` + ' ]**',true)
		.addField("User", user, true)
		message.channel.send({embed : muteembed});
		var muteembeddm = new Discord.RichEmbed()
		.setAuthor(`Muted!`, user.displayAvatarURL)
		.setDescription(`      
${user} انت معاقب بميوت كتابي بسبب مخالفة القوانين
${message.author.tag} تمت معاقبتك بواسطة
[ ${reason} ] : السبب
اذا كانت العقوبة عن طريق الخطأ تكلم مع المسؤلين
`)
		.setFooter(`في سيرفر : ${message.guild.name}`)
		.setColor("RANDOM")
	user.send( muteembeddm);
  }
if(command === `unmute`) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("**ليس لديك صلاحية لفك عن الشخص ميوت**:x: ").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("**ما عندي برمشن**").then(msg => msg.delete(6000))

  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage("**عليك المنشن أولاّ**:x: ");

  let role = message.guild.roles.find (r => r.name === "Muted");
  
  if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**لم يتم اعطاء هذه شخص ميوت من الأساس**:x:")

  await toMute.removeRole(role)
  message.channel.sendMessage("**لقد تم فك الميوت عن شخص بنجاح**:white_check_mark:");

  return;

  }

});

//Roles

client.on('message', message =>{

  if(message.content == "-roles"){
      var 
      ros=message.guild.roles.size,
      data = [['Rank', 'RoleName']]
      for(let i =0;i<ros;i++){
          if(message.guild.roles.array()[i].id !== message.guild.id){
       data.push([i,`${message.guild.roles.filter(r => r.position == ros-i).map(r=>r.name)}`])
      }}

      message.channel.send(`**\`\`\`xl\n${res}\`\`\`**`);
  }
});

//Role

client.on("message", message => {
	var prefix = "-";
	var args = message.content.split(' ').slice(1); 
	var msg = message.content.toLowerCase();
	if( !message.guild ) return;
	if( !msg.startsWith( prefix + 'role' ) ) return;
	if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' **__ليس لديك صلاحيات__**');
	if( msg.toLowerCase().startsWith( prefix + 'roleremove' ) ){
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد سحب منه الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد سحبها من الشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().removeRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم سحب من **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.removeRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم سحب من البشريين رتبة**');
		} 	
	} else {
		if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد اعطائها الرتبة**' );
		if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );if( message.mentions.members.first() ){
			message.mentions.members.first().addRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم اعطاء **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.addRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الكل رتبة**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البوتات رتبة**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البشريين رتبة**');
		} 
	} 
});

//Count

client.on('message', message => {
  if (!message.channel.guild) return;
if(message.content =='-count')
var IzRo = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setFooter(message.author.username, message.author.avatarURL)
.setTitle(':tulip:| Members info')
.addBlankField(true)
.addField('عدد اعضاء السيرفر',`${message.guild.memberCount}`)
message.channel.send(IzRo);
});

//Move

client.on('message', message => {
	var prefix = "-";
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.channel.send("``لاستخدام الأمر اكتب هذه الأمر : " +prefix+ "move [USER]``")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك✅ `)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("``لا تستطيع سحب "+ message.mentions.members.first() +" `يجب ان يكون هذه العضو في روم صوتي`")
}
} else {
 message.channel.send("**``يجب ان تكون في روم صوتي لكي تقوم بسحب العضو أليك``**")
}
} else {
message.react("❌")
 }}});

 //Bot

 client.on('message', message => {
  if (message.content.startsWith("-bot")) {
  message.channel.send({
      embed: new Discord.RichEmbed()
          .setAuthor(client.user.username,client.user.avatarURL)
          .setThumbnail(client.user.avatarURL)
          .setColor('RANDOM')
          .setTitle('``INFO RezfixServer`` ')
          .addField('``My Ping``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
          .addField('``RAM Usage``', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true)
          .addField('``servers``', [client.guilds.size], true)
          .addField('``channels``' , `[ ${client.channels.size} ]` , true)
          .addField('``Users``' ,`[ ${client.users.size} ]` , true)
          .addField('``My Name``' , `[ ${client.user.tag} ]` , true)
          .addField('``My ID``' , `[ ${client.user.id} ]` , true)
          .addField('``My Prefix``' , `[ - ]` , true)
          .addField('``My Language``' , `[ Java Script ]` , true)
          .setFooter('By | NextaCommunity')
  })
}
});

//Server

client.on('message', message => {
  var prefix ="-";
if(message.content.startsWith(prefix +"server")){
if(!message.channel.guild) return message.reply(' ');
const millis = new Date().getTime() - message.guild.createdAt.getTime();
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
const days = millis / 1000 / 60 / 60 / 24;
let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
var embed  = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.addField("**🆔 Server ID:**", message.guild.id,true)
.addField("**📅 Created On**", message.guild.createdAt.toLocaleString(),true)
.addField("**👑 Owned by**",`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
.addField("👥 Members ",`[${message.guild.memberCount}]`,true)
.addField('**💬 Channels **',`**${message.guild.channels.filter(m => m.type === 'text').size}**` + ' text | Voice  '+ `**${message.guild.channels.filter(m => m.type === 'voice').size}** `,true)
.addField("**🌍 Others **" , message.guild.region,true)
.addField("** 🔐 Roles **",`**[${message.guild.roles.size}]** Role `,true)
.setColor('#000000')
message.channel.sendEmbed(embed)

}
});

//Colors

client.on('message', ra3d => {
  var prefix = "-";
                          let args = ra3d.content.split(" ").slice(1).join(" ")
  if(ra3d.content.startsWith(prefix + 'ccolors')) {
      if(!args) return ra3d.channel.send('`يرجي اختيار كم لون `');
               if (!ra3d.member.hasPermission('MANAGE_ROLES')) return ra3d.channel.sendMessage('`**⚠ | `[MANAGE_ROLES]` لا يوجد لديك صلاحية**'); 
                ra3d.channel.send(`**✅ |Created __${args}__ Colors**`);
                    setInterval(function(){})
                      let count = 0;
                      let ecount = 0;
            for(let x = 1; x < `${parseInt(args)+1}`; x++){
              ra3d.guild.createRole({name:x,
                color: 'RANDOM'})
                }
              }
         });


//Help

client.on("message", message => {
  if (message.content === "-help") {
         message.react("✅")
            message.react("📬")
   const embed = new Discord.RichEmbed() 
       .setColor("#ffff00")
       .setDescription(`
 

══════════ஜ۩۞۩ஜ════════════ 
       اوامر البوت

اوامر العامة
  └─ **+help-public**
  
اوامر ادارية
  └─ **+help-admin**

 ══════════ஜ۩۞۩ஜ════════════
  `)
  .setFooter('Requested by '+message.author.username, message.author.avatarURL)
     
     
    message.author.sendEmbed(embed)
     
    }
    }); 

  client.on("message", message => {
    if (message.content === "-help-public") {
    message.react("✅")
    message.react("😵")
     const embed = new Discord.RichEmbed() 
         .setColor("#fff")
         .setDescription(`
    
     ══════════ஜ۩۞۩ஜ════════════
     **       اوامر عامة    

     ❖رابط ~ رابط السيرفر
     ❖-report ~ الابلاغ عن شخص مسيئ او شخص مخالفة قوانين
     ❖-new ~ انشاء تذكرة 
     ❖-server ~يعرض لك معلومات عن السيرفر
     ❖-bot ~ يعرض لك كل معلومات البوت
     ❖-count ~ يعرض لك عدد الاشخاص بالسيرفر بدون بوتات
     ❖-invites ~ يعرض لك  عدد انفايتاتك بالسيرفر 
     ❖-invite-codes ~ يعرض لك روابط الانفايتات حكك في السيرفر 
     ❖-roles ~ يعرض لك كل الرانكات بالسيرفر بشكل جميل
     ❖-image ~ صورة السيرفر
     ❖-id ~ معلومات عنك
     ❖-sug ~ اقتراح للسيرفر
     ❖-bans ~ عدد الاشخاص المبندة **
     
    ══════════ஜ۩۞۩ஜ════════════
     `)
     .setFooter('Requested by '+message.author.username, message.author.avatarURL)
     
      
       
       
    message.author.send({ embed: embed });
       
    }
    }); 

    client.on("message", message => {
      if (message.content === "+help-admin") {
       message.react("✅")
    message.react("📬")
       const embed = new Discord.RichEmbed() 
     .setColor("#ffff00")
     .setDescription(`
     
    
    
      ══════════ஜ۩۞۩ஜ════════════ 
    **       اوامر ادارية    

❖-new ~ انشاء التذكرة 
❖-close ~ اغلاق التذكرة
❖-move @user ~  لسحب الشخص الى روومك
❖-bc ~ رسالة جماعية الى كل اعضاء السيرفر
❖-role @user <rank> ~ لأعطاء رتبة لعضو معين
❖-roleremove @user <rank> ~ لازالة الرتبة من شخص معين
❖-role all <rank> ~ لأعطاء رتبة للجميع
❖-role humans <rank> ~ لأعطاء رتبة للاشخاص فقط
❖-role bots <rank> ~ لأعطاء رتبة لجميع البوتات
❖-clear ~ مسح الشات
❖-mute @user <reason> ~ اعطاء العضو ميوت لازم رتبة <Muted>
❖-unmute @user ~ لفك الميوت عن الشخص 
❖-kick @user <reason> ~ طرد الشخص من السيرفر
❖-ban @user <reason> ~ حضر الشخص من السيرفر
❖-colors <number> ~ ينشا لك الوان مع كم الوان تبي **
      
     ══════════ஜ۩۞۩ஜ════════════  
     
      `)
      .setFooter('Requested by '+message.author.username, message.author.avatarURL)
    
         
         
        message.author.sendEmbed(embed)
         
        }
        }); 


//Clear

client.on('message', msg => {
	var prefix = "-";
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "clear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("***لا يوجد عدد محدد```***").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.channel.send("```Cleard: " + textxt + "\n Messages```").then(m => m.delete(3000));
        }    
    }
}
});

//nshr

client.on("message", async message => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    if(/(?:https?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content)) {
        message.delete();
        let inviteEmbed = new Discord.RichEmbed()
  
        .setDescription("__**Auto Suppression**__")
        .addField("> Envoyé par :", `<@${message.author.id}> avec l'ID ${message.author.id}`)
        .addField("> Suppression dans :", message.channel)
        .addField(`> Raison :`, `Envoie une invitation discord : ${message.content}`)
        .setColor(violet);
  
        let incidentchannel = message.guild.channels.find(`name`, "log-nshr");
        if(!incidentchannel) return message.channel.send(":no_entry: Je n'est pas trouvé le channel 'logs' !");
        return incidentchannel.send(inviteEmbed);
    }
  }
  });

client.on("message", msg => { //Toxic Codes CopyRight & Me 92.♥#0092
  if(msg.author.bot) return;
  if(msg.channel.type === 'dm') return;
let prefix = '-'; //البرفكس
let msgarray = msg.content.split(" ");
let cmd = msgarray[0];
let args = msgarray.slice(1);
if(cmd === `${prefix}warn`){//الامر
  
  

  let rUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
if(!rUser) return msg.channel.send("Couldn't find users.");
    let reason = args.join(" ").slice(22);

    let reportembed = new Discord.RichEmbed()
    .setDescription("Warn")
    .setColor("BLACK")
    .addField("Warn User", `${rUser} with ID: ${rUser.id}`)
    .addField("Warn By", `${msg.author} with ID: ${msg.author.id}`)
    .addField("Channel", msg.channel)
    .addField("Time", msg.createdAt)
    .addField("Reason",`${reason}`)
    
    
    let reportchannel = msg.guild.channels.find(`name`,"اسم الروم"); //حط هنا اسم الروم الي يوريك بعض المعلومات
    if(!reportchannel) return msg.channel.send("Couldn't find `warns` channel. "); //ط هنا اسم الروم الي يوريك بعض المعلومات
    
    msg.delete().catch(O_o=>{});
    reportchannel.send(reportembed);
    let role = msg.guild.roles.find(`name`, 'اسم الرتبة'); //حط هنا اسم الرتبة
    if(!role) return msg.guild.channel.send("Could't find `اسم الرتبة` role."); //حط هنا اسم الرتبة
    rUser.addRole(role);
    
        return;
    }
    }); //Toxic Codes

  client.on('message' , async message => {
    if(message.author.bot) return;
    var prefix = "-";     
    if (message.content.startsWith(prefix + "voice")) {
    var guild = message.guild
  if(message.channel.type == 'dm') return;
  const embed = new Discord.RichEmbed() 
      .setColor("RANDOM")
      .setFooter('Requested by '+message.author.username, message.author.avatarURL)
      .setAuthor("Voice Online", "https://cdn.discordapp.com/attachments/527460367513944074/527744824212979724/15b08f0cfd08161c96fc3aa1b662f218.jpeg")
          .setFooter(` العدد : ${guild.members.filter(member => member.voiceChannel).size}`)
      .setDescription(`\n${guild.members.filter(member => member.voiceChannel).map(m => m.user.tag).join('\n')}`);
    message.channel.sendEmbed(embed);
  }// لو تبي تغير الوقت اللي تنرسل فيه الرساله غير رقم 30 الى عدد الدقائق اللي تبيهه ..
  });

  //Image

  client.on("message", message => {
    const prefix = "-"
               
          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === prefix + "image"){ 
          const embed = new Discord.RichEmbed()
   
      .setTitle(`This is  ** ${message.guild.name} **  Photo !`)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor(0x164fe3)
    .setImage(message.guild.iconURL)
    .setURL(message.guild.iconrURL)
                    .setTimestamp()
 
   message.channel.send({embed});
      }
  });

  client.on('message', message => {
    if (message.content.startsWith("رابط")) {
      if(!message.guild.member(client.user).hasPermission("CREATE_INSTANT_INVITE")) return message.reply("**I Don't Have `CREATE_INSTANT_INVITE` Permission**").then(msg => msg.delete(6000))
  
        message.channel.createInvite({
          thing: true,
          maxUses: 5,
          maxAge: 86400,
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
      message.channel.send("**:link: Invite Linke Sent In DM Successfully**")
    }
  });
  
  client.on("message", message => {
    let args = message.content.split(" ").slice(1);
  if (message.content.startsWith('-report')) {
        let user = message.mentions.users.first();
        let reason = args.slice(1).join(' ');
        let modlog = client.channels.find('name', 'reports');
        if (!reason) return message.reply('**ضع سبباً مقنعاً**');
          if (message.mentions.users.size < 1) return message.reply('**يجب عليك منشن للعضو المراد الابلاغ عليه**').catch(console.error);
   
    if (!modlog) return message.reply('**لا يوجد روم بأسم report**');
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('نوع الرسالة:', 'Report')
      .addField('المراد الابلاغ عليه:', `${user.username}#${user.discriminator} (${user.id}`)
      .addField('صاحب الابلاغ:', `${message.author.username}#${message.author.discriminator}`)
      .addField('السبب', reason);
      message.delete()
      return client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
  }
  });

  client.on("message", async message => {
    if(!message.channel.guild) return;
var prefix = "-";
if(message.content.startsWith(prefix + 'member')) {
    let guild = await message.guild.fetchMembers()
    let bots = guild.members.filter(m => m.user.bot).size
    let members = guild.memberCount
    let humans = members - bots
    let dndusers = guild.members.filter(member => member.user.presence.status === "dnd")
    let awayusers = guild.members.filter(member => member.user.presence.status === "idle")
    let onlineusers = guild.members.filter(member => member.user.presence.status === "online")
    let offlineusers = guild.members.filter(member => member.user.presence.status === "offline")
    var embed = new Discord.RichEmbed()
          .setColor("#000000")
          .setTitle("Membercount")
          .setDescription("Membercount in " + guild.name)
          .addField("Members", `${members}`, true)
          .addField("Humans", `${humans}`, true)
          .addField("Bots", `${bots}`, true)
          .addField("Status Users", `Online Users: ${onlineusers.size}\nDND Users: ${dndusers.size}\nAway Users: ${awayusers.size}\nOffline Users: ${offlineusers.size}\nTotal Members: ${message.guild.memberCount}`, true)
          .setThumbnail(message.author.avatarURL)
          message.channel.send({ embed: embed });
 
  }
 
    });

    client.on('message', message => {
  
      if(message.content.split(' ')[0] == '-sug'){
          if (message.author.bot) return;
        
                              let args = message.content.split(' ').slice(1).join(' ');
                                   if (!args) return message.reply("You Have To Write A Msg !");
      
        let embed = new Discord.RichEmbed()
                                                      .setAuthor(message.author.username, message.author.avatarURL)
                                                      .setDescription('**__:mailbox_with_mail: Suggestion Sent !__**')
                                                      .setThumbnail(message.author.avatarURL)
                                                      .addField("**-Sent By :**", message.author.username)
                                                          .addField("**-Sender ID :**", message.author.id)
                                                      .addField("**-Suggest :**", args)
                                                      .setColor("FF0000")
                                                      .setFooter(message.author.username, message.author.avatarURL)
                                                     
                                                      
       client.channels.get("515554835496697887").send({ embed: embed });
        let embe = new Discord.RichEmbed()
                                                      .setAuthor(message.author.username, message.author.avatarURL)
                                                      .setDescription('**__:mailbox_with_mail: Suggestion Sent Successfully !__**')
                                                      .setThumbnail(message.author.avatarURL)
                                                                                                      .setColor("FF0000")
      
                                                      .setFooter(message.author.username, message.author.avatarURL)
                                                      message.channel.sendEmbed({ embed: embed });
                 
                                        
      }
      });

client.login(process.env.BOT_TOKEN);
