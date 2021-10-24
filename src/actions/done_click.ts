import { App } from '@slack/bolt';

export const done_click = (app: App) => {
    app.action('done_click', async({ ack, say }) => {
        await ack();
        await say('ボタンが押された');
    })
}