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
        "text": {
            "type": "plain_text",
            "text": task.task_name,
            "emoji": true
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
                "type": "input",
                "element": {
                    "type": "checkboxes",
                    "options": taskSections,
                    "action_id": "checkboxes-action"
                },
                "label": {
                    "type": "plain_text",
                    "text": `${user_name}のTODO`,
                    "emoji": true
                }
            }
        ]
    }
}

interface CreateTaskViewProps {
    userId: string,
    userName: string
}

export const createTaskView = async({userId, userName}: CreateTaskViewProps) => {
    console.log("createTaskViewProps: ", {userId, userName});
    const tasks = await getTasksForUser(userId);
    console.log('tasks in createTaskView: ', tasks);
    if(tasks){
        const taskList = tasks.map(task => ({
            task_id: task.dataValues.task_id,
            task_name: task.dataValues.task_name
        }));
        console.log('taskList: ', taskList);
        return blockEditor({ tasks:taskList, user_name: userName, user_id: userId });
    } else {
        return null;
    }
}
