// eslint-disable-next-line @typescript-eslint/no-var-requires
const models = require('../models');
import { getTaskResult } from './types';

export const getTasksForUser = (userId: string) => {
    return models.Tasks.findAll({
        where: {
            user_id: userId,
            is_done: false
        }
    }) as Promise<Array<getTaskResult>>;
};

export const postTask = async (taskName: string, userId: string) => {
    const getMaxTaskId = () => {
        return models.Tasks.max("task_id");
    };

    return models.Tasks.create({
        task_id: await getMaxTaskId() + 1,
        task_name: taskName,
        user_id: userId,
        is_done: false,
    });
};

export const updateDoneTask = async (taskId: number) => {
    await models.Tasks.update({
        is_done: true,
    },{
        where: {
            task_id: taskId,
        }
    });
};