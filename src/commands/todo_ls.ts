import { App } from '@slack/bolt';
import { createTaskView } from '../blockEditor';

export const todo_ls = (app: App) => {
    app.command('/todo_ls', async ({command, ack, say}) => {
        await ack();

        const sayTask = async (userId: string, userName: string) => {
            const tasks = await createTaskView({userId, userName});
            if(!tasks){
                await say("タスクがありません");
                return;
            }
            await say (tasks)
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