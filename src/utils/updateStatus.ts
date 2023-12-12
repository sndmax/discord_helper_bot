import { BotClient } from './types';
import { teamsModel } from '../models';
import { ActivityType } from 'discord.js';

export const updateStatus = async (client: BotClient) => {
    const teams = await teamsModel.getTeamsList();
    client.user.setActivity({
        name: `${teams.length} looking for a team | /info`,
        type: ActivityType.Custom,
    });
};
