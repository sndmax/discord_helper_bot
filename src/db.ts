import { Sequelize, STRING, TEXT } from 'sequelize';
import { config } from './config';

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

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
