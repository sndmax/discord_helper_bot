import { BotClient } from './types';
import { ActivityType } from 'discord.js';
import { getTeamsList } from '../db';

export const updateStatus = async (client: BotClient) => {
    const teams = await getTeamsList();

    client.user.setActivity({
        name: `${teams.length} looking for a team | /info`,
        type: ActivityType.Custom,
    });
};
