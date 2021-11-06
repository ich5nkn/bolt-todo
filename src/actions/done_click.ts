import { App } from '@slack/bolt';
import { createTaskView } from '../blockEditor';
import {updateDoneTask} from "../postgres";

export const done_click = (app: App) => {
    app.action('done_click', async({ ack, respond, payload }) => {
        await ack();
        const anyPayload = payload as any;
        const [taskId, userId, userName] = anyPayload.value.split(',');
        // anyPayload.valueをカンマ区切りで取得して、タスクIDとユーザーIDに分割
        // レスポンドの中でユーザーIDを引数にtodo_lsと同様の処理を実行
        // doneに更新
        if(Number(taskId)){
            updateDoneTask(Number(taskId));
        }
        const tasks = await createTaskView({userId, userName})
        if(!tasks){
            await respond(`${userName} のすべてのタスクを完了しました`);
            return;
        }
        await respond (tasks);
    })
}