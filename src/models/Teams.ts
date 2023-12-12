import { STRING, TEXT } from 'sequelize';
import { sequelize } from '../utils/sequelize';

export const Teams = sequelize.define('groups', {
    username: {
        type: STRING,
        unique: true,
    },
    description: TEXT,
});

export const findTeam = (username: string) => {
    return Teams.findOne({ where: { username } });
};

export const cancelTeam = (username: string) => {
    return Teams.destroy({ where: { username } });
};

export const getTeamsList = () => {
    return Teams.findAll({ raw: true });
};
