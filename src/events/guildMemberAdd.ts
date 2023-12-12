import { GuildMember } from 'discord.js';

export default {
    data: { name: 'guildMemberAdd' },
    async run(member: GuildMember, b: any) {
        const PLAYER_ROLE_ID = '1162843052658933811';
        console.log({ member, b });
        console.log(
            'User: ' + member.user.username + ' has joined the server!'
        );
        return member.roles.add(PLAYER_ROLE_ID);
    },
};
