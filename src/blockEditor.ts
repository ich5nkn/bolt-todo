import { getTasksForUser } from "./postgres";

interface OwnTask {
    task_name: string
    task_id: number
}

interface BlockEditorProps {
    tasks: OwnTask[]
    user_name: string
    user_id: string
}

const blockEditor = ({tasks, user_name, user_id}: BlockEditorProps) => {
    const taskSections = tasks.map(task => ({
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": task.task_name
        },
        "accessory": {
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": "Done",
                "emoji": true
            },
            "value": `${task.task_id},${user_id},${user_name}`,
            "action_id": "done_click"
        }
    }))
    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `${user_name}のTODO`,
                    "emoji": true
                }
            },
            {
                "type": "divider"
            },
            ...taskSections,
            {
                "type": "divider"
            },
        ]
    }
}

interface CreateTaskViewProps {
    userId: string,
    userName: string
}

export const createTaskView = async({userId, userName}: CreateTaskViewProps) => {
    const tasks = await getTasksForUser(userId);
    if(tasks.length > 0){
        const taskList = tasks.map(task => ({
            task_id: task.dataValues.task_id,
            task_name: task.dataValues.task_name
        }));
        return blockEditor({ tasks:taskList, user_name: userName, user_id: userId });
    } else {
        return null;
    }
}
