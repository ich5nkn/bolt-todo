import { App } from '@slack/bolt';
import { blockEditor } from '../blockEditor';
import { getTasksForUser } from '../postgres';

export const todo_ls = (app: App) => {
    app.command('/todo_ls', async ({command, ack, say}) => {
        await ack();

        const sayTask = async (userId: string, userName: string) => {
            const tasks = await getTasksForUser(userId);
            if(tasks){
                const taskList = tasks.map(task => ({
                    task_id: task.dataValues.task_id,
                    task_name: task.dataValues.task_name
                }));

                console.log('block >> ', blockEditor({tasks:taskList, user_name: userName}));

                await say({
                    "blocks": [
                        {
                            "type": "section",
                            "text": {
                                "type": "plain_text",
                                "text": "This is a plain text section block.",
                                "emoji": true
                            }
                        },
                        {
                            "type": "divider"
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "風呂に入る"
                            },
                            "accessory": {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Done",
                                    "emoji": true
                                },
                                "value": "done_123",
                                "action_id": "done-button"
                            }
                        },
                        {
                            "type": "divider"
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "This is a section block with a button."
                            },
                            "accessory": {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Click Me",
                                    "emoji": true
                                },
                                "value": "click_me_123",
                                "action_id": "button-action"
                            }
                        }
                    ]
                });
            } else {
                await say("タスクがありません");
            }
        };

        if(!command.text) {
            await sayTask(command.user_id, '自分');
            return;
        }

        if(/<@.*>$/.test(command.text)) {
            const result = command.text.match(/(?<=\<@).*?(?=\|)/);
            const userName = command.text.match(/(?<=\|).*?(?=\>)/);
            if(result && userName) {
                await sayTask(result[0], userName[0]);
                return;
            }
        }

        await say("正しいユーザー名を記載してください（例：@ユーザーネーム）");
        return;
    });
};