// eslint-disable-next-line @typescript-eslint/no-var-requires
const models = require('../models');

export const getTask = (id: number) => {
    return models.tasks.findOne({
        where: {
            id: id
        }
    }) as Promise<any>;
};

export const getTasksForUser = (userId: string) => {
    return models.tasks.findAll({
        where: {
        user_id: userId
        }
    }) as Promise<any>;
};