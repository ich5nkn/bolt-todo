// eslint-disable-next-line @typescript-eslint/no-var-requires
const models = require('../models');
import { getTaskResult } from './types';

export const getTasksForUser = (userId: string) => {
    return models.Tasks.findAll({
        where: {
            user_id: userId
        }
    }) as Promise<Array<getTaskResult>>;
};

const getMaxTaskId = () => {
    return models.Tasks.max("task_id");
};

export const postTask = async (taskName: string, userId: string) => {
    console.log( await getMaxTaskId());
    return models.Tasks.create({
        task_id: await getMaxTaskId() + 1,
        task_name: taskName,
        user_id: userId,
        is_done: false,
    });
};