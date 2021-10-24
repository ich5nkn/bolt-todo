export type getTaskResult = {
    dataValues: {
        id: number;
        task_id: number;
        task_name: string;
        user_id: string;
        is_done: string;
    };
    isNewRecord: boolean;
};