import { GuildMember } from 'discord.js';
import { config } from '../config';

export default {
    data: { name: 'guildMemberAdd' },
    async run(member: GuildMember, b: any) {
        const { DISCORD_PLAYER_ROLE } = config;

        if (!DISCORD_PLAYER_ROLE) {
            return;
        }

        console.log({ member, b });
        console.log('User: ' + member.user.username + ' has joined the server!');

        return member.roles.add(DISCORD_PLAYER_ROLE);
    },
};
