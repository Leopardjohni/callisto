const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'Help', []);
  }

  run(client, message, args) {
    message.channel.send('help command works');
  }
}