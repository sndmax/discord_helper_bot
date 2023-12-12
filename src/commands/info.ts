import {
    ActionRowBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChatInputCommandInteraction,
    Colors,
    CommandInteraction,
    EmbedBuilder,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import { teamsModel } from '../models';
import { BotClient } from '../utils/types';
import { createButton } from '../utils/createButton';
import { getUser } from '../utils/getUser';
import { updateStatus } from '../utils/updateStatus';

const getEmbed = async (client: BotClient) =>
    new EmbedBuilder()
        .setColor(Colors.Orange)
        .setTitle('Hello! I will try to help you with some extra features.')
        .addFields({
            name: 'Currently looking for a teammate:',
            value:
                (await teamsModel.getTeamsList())
                    .map((team: any) => getUser(client, team.username))
                    .filter((value) => value)
                    .join(', ') || 'No one 😟',
        });

const getButtons = async (
    interaction: CommandInteraction | ButtonInteraction
) => {
    const veinMineInfo = createButton('veinMineInfo', 'Veinmining');
    const claimsInfo = createButton('claimsInfo', 'Claims');
    const commandsInfo = createButton('commandsInfo', 'Commands');
    const startTeamSearch = createButton(
        'startTeamSearch',
        'Start looking for a teammate',
        ButtonStyle.Success
    );
    const stopTeamSearch = createButton(
        'stopTeamSearch',
        'Stop looking for a teammate',
        ButtonStyle.Danger
    );

    const teamStatus = await teamsModel.findTeam(interaction.user.username);

    return new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        teamStatus ? stopTeamSearch : startTeamSearch,
        commandsInfo,
        claimsInfo,
        veinMineInfo
    );
};

export default {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Ask me for useful info!'),
    async run(client: BotClient, interaction: ChatInputCommandInteraction) {
        return updateInfoMessage(client, interaction);
    },
};

export const updateInfoMessage = async (
    client: BotClient,
    interaction: ChatInputCommandInteraction | ButtonInteraction
) => {
    const buttons = await getButtons(interaction);
    const messageData = {
        components: [buttons],
        embeds: [await getEmbed(client)],
        allowedMentions: { parse: [], repliedUser: false },
    };

    updateStatus(client);

    if (interaction.isChatInputCommand()) {
        return interaction.reply(messageData);
    }

    if (interaction.isButton()) {
        return interaction.message.edit(messageData);
    }
};
