import { App } from '@slack/bolt';
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

app.command('todo_ls', async ({command, ack, respond}) => {
  await ack();
  await respond(`${command.text}`);
});