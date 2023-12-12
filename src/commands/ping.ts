import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { BotClient } from '../utils/types';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async run(client: BotClient, interaction: ChatInputCommandInteraction) {
        return interaction.reply('Puke!');
    },
};
