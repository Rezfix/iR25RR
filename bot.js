const Discord = require('discord.js');
const client = new Discord.Client();
 
client.on('ready', () => {
    client.user.setGame('RezfixMC System -help','https://www.twitch.tv/RezfixServer');
    console.log('---------------');
    console.log('RezfixMC Online')
    console.log('---------------')
  });

if(omar.content.split(' ')[0] == prefix + 'clr') { 
if (!omar.channel.guild) return;
if(!omar.guild.member(omar.author).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return;
if(!omar.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return omar.reply(`**I D'ont Have Permission For That !`);
omar.guild.roles.forEach(m => {
m.delete();
});
 
client.login(process.env.BOT_TOKEN);
