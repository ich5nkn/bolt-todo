import { App } from '@slack/bolt';
import {updateDoneTask} from "../postgres";

export const done_click = (app: App) => {
    app.action('done_click', async({ ack, respond, payload }) => {
        await ack();
        const anyPayload = payload as any;
        console.log(anyPayload);
        // anyPayload.valueをカンマ区切りで取得して、タスクIDとユーザーIDに分割
        // ユーザーIDを引数にtask_lsを実行してレスポンドする
        console.log(anyPayload.value);
        if(Number(anyPayload.value)){
            updateDoneTask(Number(anyPayload.value));
        }
        await respond("タスクを完了しました")
    })
}