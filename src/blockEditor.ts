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
            "value": task.task_id,
            "action_id": "done-button"
        }
    }))
    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `${user_name} のTODO`,
                    "emoji": true
                }
            },
            {
                "type": "divider"
            },
            ...taskSections,
            {
                "type": "divider"
            }
        ]
    }
}