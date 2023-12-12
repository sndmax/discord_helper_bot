import { Interaction } from 'discord.js';
import { BotClient } from '../utils/types';

export default {
    data: { name: 'interactionCreate' },
    async run(client: BotClient, interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command)
                return void interaction.reply({
                    content: `Command \`${interaction.commandName}\` not found.`,
                    ephemeral: true,
                });

            return command.run(client, interaction);
        }

        if (interaction.isButton()) {
            const event = client.events.get(interaction.customId);
            return event?.run(client, interaction);
        }
    },
};
