import { App } from '@slack/bolt';
import { todo_add } from './commands/todo_add';
import { todo_ls } from './commands/todo_ls';
import { done_click } from './actions/done_click';

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

todo_add(app);
todo_ls(app);
done_click(app);