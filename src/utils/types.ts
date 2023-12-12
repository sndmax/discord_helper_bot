import {
    Client,
    Collection,
    Interaction,
    Message,
    SlashCommandBuilder,
} from 'discord.js';

export type BotCommands = Collection<string, Command>;

export type BotClient = Client<true> & {
    commands: BotCommands;
    events: BotCommands;
};

export type Command = {
    data: SlashCommandBuilder;
    run: (client: BotClient, interaction: Interaction) => Promise<Message>;
};
