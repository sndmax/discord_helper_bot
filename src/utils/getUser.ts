import { BotClient } from './types';

export const getUser = (client: BotClient, name: string) => {
    const user = client.users.cache.find(({ username }) => username === name);

    if (!user) return;

    return `<@${user.id}>`;
};
