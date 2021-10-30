import { App } from '@slack/bolt';
import {updateDoneTask} from "../postgres";

export const done_click = (app: App) => {
    app.action('done_click', async({ ack, respond, payload }) => {
        await ack();
        const anyPayload = payload as any;
        console.log(anyPayload);
        // anyPayload.valueをカンマ区切りで取得して、タスクIDとユーザーIDに分割
        // レスポンドの中でユーザーIDを引数にtodo_lsと同様の処理を実行
        console.log(anyPayload.value);
        if(Number(anyPayload.value)){
            updateDoneTask(Number(anyPayload.value));
        }
        await respond("タスクを完了しました")
    })
}