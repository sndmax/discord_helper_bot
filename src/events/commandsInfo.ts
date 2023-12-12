import { ButtonInteraction, Colors, EmbedBuilder } from 'discord.js';
import { BotClient } from '../utils/types';

export default {
    data: { name: 'commandsInfo' },
    async run(client: BotClient, interaction: ButtonInteraction) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(Colors.Aqua)
                    .setTitle('Commands')
                    .setDescription(
                        '- /rtp - teleport to a random place\n- /tpa <player> - ask teleport to a player\n- /sethome - set home position\n- /home - teleport to home position\n- /back - return to previous place'
                    ),
            ],
        });
    },
};
