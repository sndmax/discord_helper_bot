import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { config } from './config';
import { BotClient } from './utils/types';
import { updateStatus } from './utils/updateStatus';
import { Teams } from './db';

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

const iterateModule = async (dirName: string, callback: (module: any) => void) => {
    const files = readdirSync(join(__dirname, dirName)).filter((file) => !file.endsWith('.map'));

    for (const file of files) {
        // const module = await import(join('file://', __dirname, dirName, file));
        const module = await import(join(__dirname, dirName, file));
        console.log(`👌 Loaded: ${module.default.data.name}`);
        callback(module.default);
    }
};

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
    await Teams.sync();
    await registerSlashCommands();
    await registerEvents();
    await updateStatus(readyClient as BotClient);

    console.log('🤖 Discord bot ' + readyClient.user.tag + ' is ready!');
});

client.login(config.DISCORD_TOKEN);
