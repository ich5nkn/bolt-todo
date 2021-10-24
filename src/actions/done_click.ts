import { App } from '@slack/bolt';

export const done_click = (app: App) => {
    app.action('done_click', async({ ack, say, payload }) => {
        await ack();
        const anyPayload = payload as any;
        if(Number(anyPayload.value)){
            // updateDoneTask の 関数を作る
            updateDoneTask(Number(anyPayload.value));
        }
        
    })
}