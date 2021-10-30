interface OwnTask {
    task_name: string
    task_id: number
}

interface OwnProps {
    tasks: OwnTask[]
    user_name: string
}

export const blockEditor = ({tasks, user_name}: OwnProps) => {
    const taskSections = tasks.map(task => ({
        "text": {
            "type": "plain_text",
            "text": task.task_name,
            "emoji": true
        },
        "value": `${task.task_id}`
    }));
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