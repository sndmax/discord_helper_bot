import { ButtonInteraction } from 'discord.js';
import { teamsModel } from '../models';
import { SequelizeScopeError } from 'sequelize';
import { BotClient } from '../utils/types';
import { updateInfoMessage } from '../commands/info';
import { getUser } from '../utils/getUser';

export default {
    data: { name: 'startTeamSearch' },
    async run(client: BotClient, interaction: ButtonInteraction) {
        const { tag } = interaction.user;

        try {
            await teamsModel.Teams.create({
                username: tag,
                description: 'Custom comment',
            });

            await updateInfoMessage(client, interaction);

            return interaction.reply(
                `${getUser(client, tag)} started looking for a teammate! 🎮`
            );
        } catch (error) {
            const requestError = error as SequelizeScopeError;

            if (requestError.name === 'SequelizeUniqueConstraintError') {
                return interaction.message.edit(
                    'You already looking for a teammate.'
                );
            }

            return interaction.message.edit(
                'Something went wrong with trying to find a teammate.'
            );
        }
    },
};
