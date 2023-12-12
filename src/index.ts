import {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    REST,
    Routes,
} from 'discord.js';
import { config } from './config';
import { teamsModel } from './models';

import { BotClient } from './utils/types';
import { iterateModule } from './utils/iterateModule';
import { updateStatus } from './utils/updateStatus';

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
    ],
}) as BotClient;

client.commands = new Collection();
client.events = new Collection();

const registerSlashCommands = async () => {
    await iterateModule('commands', (module: any) => {
        client.commands.set(module.data.name, module);
    });

    if (client.user) {
        const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: client.commands.map((command) => command.data),
        });
    }
};

const registerEvents = async () => {
    await iterateModule('events', (module) => {
        client.events.set(module.data.name, module);
        client.on(module.data.name, module.run.bind(null, client));
    });
};

client.once(Events.ClientReady, async (readyClient) => {
    await teamsModel.Teams.sync();
    registerSlashCommands();
    registerEvents();
    console.log('🤖 Discord bot ' + readyClient.user.tag + ' is ready!');

    updateStatus(readyClient as BotClient);
});

client.login(config.DISCORD_TOKEN);
