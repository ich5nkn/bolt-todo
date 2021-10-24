// eslint-disable-next-line @typescript-eslint/no-var-requires
const models = require('../models');
import { getTaskResult } from './types';

export const getTask = (id: number) => {
    return models.Tasks.findOne({
        where: {
            id: id
        }
    }) as Promise<getTaskResult>;
};

export const getTasksForUser = (userId: string) => {
    return models.Tasks.findAll({
        where: {
            user_id: userId
        }
    }) as Promise<Array<getTaskResult>>;
};

export const postTask = (taskName: string, userId: string) => {
    return models.Tasks.create({
        // TODO: 最新のtask_id を取得してインクリメントする
        task_id: 1,
        task_name: taskName,
        user_id: userId,
        is_done: false,
    });
};