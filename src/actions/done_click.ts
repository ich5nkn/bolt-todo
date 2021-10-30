import { App } from '@slack/bolt';
import {updateDoneTask} from "../postgres";

export const done_click = (app: App) => {
    app.action('done_click', async({ ack, say, payload }) => {
        await ack();
        const anyPayload = payload as any;
        if(Number(anyPayload.value)){
            updateDoneTask(Number(anyPayload.value));
        }
        await say("タスクを完了しました")
    })
}