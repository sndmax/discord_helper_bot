import { ButtonInteraction, Colors, EmbedBuilder } from 'discord.js';
import { BotClient } from '../utils/types';

export default {
    data: { name: 'claimsInfo' },
    async run(client: BotClient, interaction: ButtonInteraction) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(Colors.Aqua)
                    .setTitle('Claims')
                    .setDescription(
                        'The pack has multiple ways to protect area:\n- Minecolonies\n- Open Parties and Claims\n'
                    )
                    .addFields([
                        {
                            name: 'Commands',
                            value:
                                '- /openpac-claims ... - everything claim-related\n- /openpac-parties ... - everything party-related\n- /opm - shortcut for the party chat\n' +
                                '\n\n',
                        },
                        {
                            name: 'Key Bindings',
                            value: "' => open the mod UI",
                        },
                    ]),
            ],
        });
    },
};
