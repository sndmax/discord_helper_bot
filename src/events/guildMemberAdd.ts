import { GuildMember } from 'discord.js';
import { config } from '../config';
import { BotClient } from '../utils/types';

export default {
    data: { name: 'guildMemberAdd' },
    async run(client: BotClient, member: GuildMember) {
        const { DISCORD_PLAYER_ROLE } = config;

        if (!DISCORD_PLAYER_ROLE) {
            return;
        }

        return member.roles.add(DISCORD_PLAYER_ROLE);
    },
};
