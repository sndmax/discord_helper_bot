import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const createButton = (
    id: string,
    label: string,
    style: ButtonStyle = ButtonStyle.Primary
) => {
    return new ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
};
