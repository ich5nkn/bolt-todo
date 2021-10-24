import { App } from '@slack/bolt';
import { getTask } from '../postgres';

export const todo_ls = (app: App) => {
    app.command('/todo_ls', async ({command, ack, say}) => {
        await ack();
      
        if(!command.text) {
          command.user_id
        }
        const res = await getTask(1);
        await say(`${res.dataValues.task_name}`);
      });
};