import { ButtonInteraction } from 'discord.js';
import { SequelizeScopeError } from 'sequelize';
import { BotClient } from '../utils/types';
import { updateInfoMessage } from '../commands/info';
import { getUser } from '../utils/getUser';
import { Teams } from '../db';

export default {
    data: { name: 'startTeamSearch' },
    async run(client: BotClient, interaction: ButtonInteraction) {
        const { tag } = interaction.user;

        try {
            await Teams.create({
                username: tag,
                description: '',
            });

            await updateInfoMessage(client, interaction);

            return interaction.reply(`${getUser(client, tag)} started looking for a teammate! 🎮`);
        } catch (error) {
            const requestError = error as SequelizeScopeError;

            if (requestError.name === 'SequelizeUniqueConstraintError') {
                return interaction.message.edit('You already looking for a teammate.');
            }

            return interaction.message.edit('Something went wrong with trying to find a teammate.');
        }
    },
};
