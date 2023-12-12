import { ButtonInteraction } from 'discord.js';
import { BotClient } from '../utils/types';
import { updateInfoMessage } from '../commands/info';
import { getUser } from '../utils/getUser';
import { cancelTeam } from '../db';

export default {
    data: { name: 'stopTeamSearch' },
    async run(client: BotClient, interaction: ButtonInteraction) {
        const { username } = interaction.user;

        await cancelTeam(username);
        await updateInfoMessage(client, interaction);

        return interaction.reply(`${getUser(client, username)} stopped looking for a teammate!`);
    },
};
