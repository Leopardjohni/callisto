const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run (client, message, args) {

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`${message.author} You dont have the correct premissions to run this command.`);
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`${message.author} I do not have the correct permissions to run this command.`);

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!args[0]) return message.channel.send('Please specify a user');

    if(!member) return message.channel.send('Can\'t seem to find this user. Sorry bout that :/');
    if(!member.bannable) return message.channel.send('This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine');

    if(member.id === message.author.id) return message.channel.send('You can\'t ban yourself!');

    let banReason = args.slice(1).join(" ");

    if(!banReason) banReason = 'Unspecified';

    member.ban({ reason: banReason })
    .catch(err => {
        if(err) return message.channel.send('Something went wrong')
    })

    const banembed = new Discord.MessageEmbed()
    .setTitle('Member Banned')
    .setThumbnail(member.user.displayAvatarURL())
    .addField('User Banned', member)
    .addField('Kicked by', message.author)
    .addField('Reason', reason)
    .setFooter('Time kicked', client.user.displayAvatarURL())
    .setTimestamp()

    message.channel.send(banembed);


}
}