import { App } from '@slack/bolt';
import { getTask } from './postgres';
console.log(process.env.SLACK_SIGNING_SECRET)
console.log(process.env.SLACK_BOT_TOKEN)

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
  await app.start(Number(process.env.PORT) || 3000);
  console.log('⚡️ Bolt app is running!');
})();

app.command('/todo_add', async ({command, ack, say, client}) => {
  await ack();
  // DBに人名とタスク名を追加する

  if(!command.text){
    await say(`タスクを記載してください`);
    return;
  };

  console.log(command.text);

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

  // 第一引数に@がなければ自分のタスクとして追加する
  if (users.length === 0) {
    users.push(command.user_id);
  };

  const text = `users: ${users.join(',')} | tasks: ${tasks.join(',')} | mention: <@${users[0]}>`;

  // 第一引数に@があれば、別の人のタスクとして追加する

  console.log(await client.users.list());

  await say(text);
})

app.command('/todo_ls', async ({command, ack, say}) => {
  await ack();

  if(!command.text) {
    command.user_id
  }
  const res = await getTask(1);
  console.log(res);
  console.log(res.dataValues);
  await say(`${res.dataValues.task_name}`);
});