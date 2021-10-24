import { App } from '@slack/bolt';
import { blockEditor } from '../blockEditor';
import { getTasksForUser } from '../postgres';

export const todo_ls = (app: App) => {
    app.command('/todo_ls', async ({command, ack, say}) => {
        await ack();

        const sayTask = async (userId: string, userName: string) => {
            const tasks = await getTasksForUser(userId);
            if(tasks){
                const taskList = tasks.map(task => ({
                    task_id: task.dataValues.task_id,
                    task_name: task.dataValues.task_name
                }));
                await say(blockEditor({tasks:taskList, user_name: userName}));
            } else {
                await say("タスクがありません");
            }
        };

        if(!command.text) {
            await sayTask(command.user_id, '自分');
            return;
        }

        if(/<@.*>$/.test(command.text)) {
            const result = command.text.match(/(?<=\<@).*?(?=\|)/);
            const userName = command.text.match(/(?<=\|).*?(?=\>)/);
            if(result && userName) {
                await sayTask(result[0], userName[0]);
                return;
            }
        }

        await say("正しいユーザー名を記載してください（例：@ユーザーネーム）");
        return;
    });
};