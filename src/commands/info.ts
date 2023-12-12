import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChatInputCommandInteraction,
    Colors,
    CommandInteraction,
    EmbedBuilder,
    MessageActionRowComponentBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import { BotClient } from '../utils/types';
import { getUser } from '../utils/getUser';
import { updateStatus } from '../utils/updateStatus';
import { findTeam, getTeamsList } from '../db';

const makeEmbed = async (client: BotClient) =>
    new EmbedBuilder()
        .setColor(Colors.Orange)
        .setTitle('Hello! I will try to help you with some extra features.')
        .addFields({
            name: 'Currently looking for a teammate:',
            value:
                (await getTeamsList())
                    .map((team: any) => getUser(client, team.username))
                    .filter((value) => value)
                    .join(', ') || 'No one 😟',
        });

const makeButton = (id: string, label: string, style: ButtonStyle = ButtonStyle.Primary) =>
    new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);

const getAllButtons = async (interaction: CommandInteraction | ButtonInteraction) => {
    const veinMineInfo = makeButton('veinMineInfo', 'Veinmining');
    const claimsInfo = makeButton('claimsInfo', 'Claims');
    const commandsInfo = makeButton('commandsInfo', 'Commands');
    const startTeamSearch = makeButton('startTeamSearch', 'Start looking for a teammate', ButtonStyle.Success);
    const stopTeamSearch = makeButton('stopTeamSearch', 'Stop looking for a teammate', ButtonStyle.Danger);

    const teamStatus = await findTeam(interaction.user.username);

    return new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        teamStatus ? stopTeamSearch : startTeamSearch,
        commandsInfo,
        claimsInfo,
        veinMineInfo
    );
};

export const updateInfoMessage = async (
    client: BotClient,
    interaction: ChatInputCommandInteraction | ButtonInteraction
) => {
    const buttons = await getAllButtons(interaction);
    const messageData = {
        components: [buttons],
        embeds: [await makeEmbed(client)],
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

export default {
    data: new SlashCommandBuilder().setName('info').setDescription('Ask me for useful info!'),
    async run(client: BotClient, interaction: ChatInputCommandInteraction) {
        return updateInfoMessage(client, interaction);
    },
};
