import { App } from '@slack/bolt';
import { postTask } from '../postgres';

export const todo_add = (app: App) => {
    app.command('/todo_add', async ({command, ack, say, client}) => {
        await ack();

        if(!command.text){
          await say(`タスクを記載してください`);
          return;
        };
      
        // 引数に@がなければ自分のタスクとして追加する
        const textArray = command.text.split(' ');
      
        const users: string[] = [];
        const tasks: string[] = [];
      
        textArray.forEach(text => {
          if(/^<@.*>$/.test(text)) {
            const result = text.match(/(?<=\<@).*?(?=\|)/);
            if(result) {
              users.push(result[0]);
            }
          } else {
            tasks.push(text);
          }
        });
      
        // 引数に@がなければ自分のタスクとして追加する
        if (users.length === 0) {
          users.push(command.user_id);
        };
      
        Promise.all(tasks.map(async(task, idx) => {
          await Promise.all(users.map(async(user) => {
            await postTask(task, user, idx);
          }));
        }));
      
        const text = `users: ${users.join(',')} | tasks: ${tasks.join(',')} | mention: <@${users[0]}>`;
      
        await say(text);
      })
};