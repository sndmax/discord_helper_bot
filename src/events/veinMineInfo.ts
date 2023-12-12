import { ButtonInteraction, Colors, EmbedBuilder } from 'discord.js';
import { BotClient } from '../utils/types';

export default {
    data: { name: 'veinMineInfo' },
    async run(client: BotClient, interaction: ButtonInteraction) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(Colors.Aqua)
                    .setTitle('Veinmining')
                    .setDescription(
                        'Veinmine is disabled for blocks like dirt/cobble/stone/netherrack in this pack'
                    )
                    .addFields([
                        {
                            name: 'Key Bindings',
                            value: '~ => use veinmine',
                        },
                    ]),
            ],
        });
    },
};
