// eslint-disable-next-line @typescript-eslint/no-var-requires
const models = require('../models');
import { getTaskResult } from './types';

export const getTask = (id: number) => {
    console.log(models);
    console.log(models.Tasks);
    console.log(models.tasks);
    return models.Tasks.findOne({
        where: {
            id: id
        }
    }) as Promise<getTaskResult>;
};

export const getTasksForUser = (userId: string) => {
    return models.tasks.findAll({
        where: {
            user_id: userId
        }
    }) as Promise<Array<getTaskResult>>;
};