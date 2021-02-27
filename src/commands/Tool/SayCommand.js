const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');


module.exports = class SayCommand extends BaseCommand {
 constructor() {
   super('say', 'Tools', []);
 }

 async run(client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have premission to run this command");
   const messageToSay = args.join(" ");
   const sayEmbed = new Discord.MessageEmbed()
   .setTitle(`${messageToSay}`)
   .setColor("RANDOM");

   try {
     await message.channel.send(sayEmbed);
     
  }  catch(err) {
    console.log(err)
    message.channel.send('I am not able to say that message');
  }
 }
}