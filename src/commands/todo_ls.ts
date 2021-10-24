import { App } from '@slack/bolt';
import { getTasksForUser } from '../postgres';



export const todo_ls = (app: App) => {
    app.command('/todo_ls', async ({command, ack, say}) => {
        await ack();

        const sayTask = async (userId: string) => {
            const tasks = await getTasksForUser(userId);
            if(tasks){
                await say(tasks.map(task => `- ${task.dataValues.task_name}`).join('\n'));
            } else {
                await say("タスクがありません");
            }
        };

        if(!command.text) {
            await sayTask(command.user_id);
            return;
        }

        if(/^<@.*>$/.test(command.text)) {
            const result = command.text.match(/(?<=\<@).*?(?=\|)/);
            if(result) {
                await sayTask(result[0]);
                return;
            }
        }
        
        await say("正しいユーザー名を記載してください（例：@ユーザーネーム）");
        return;
    });
};