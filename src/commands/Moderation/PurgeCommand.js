const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run (client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have premission to run this command");

const purEmbed = new Discord.MessageEmbed()
.setTitle(`succesfully purged ${args[0]} messages!`)
.setColor("RANDOM")
.setTimestamp();

  const deleteNum = parseInt(args[0])
  if (isNaN(deleteNum)) return message.reply('Please provide a number `-purge amount`')
  message.channel.bulkDelete(deleteNum).then(() => {
    message.channel
      .send(purEmbed)
      .then(msg => msg.delete(2000));
  });
}
}