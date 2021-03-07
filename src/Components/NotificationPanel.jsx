import { useTasks } from "../store/TasksProvider";

const PENDING_TASK_SHOW_OFFSET = 1000*60*15;
const RUNNING_TASK_SHOW_OFFSET = 1000*60*45;

const NotificationPanel = () => {
    const { tasks } = useTasks();
    const scheduledTasks = tasks.open.filter(({scheduledTo}) => !!scheduledTo)
    const now = new Date()

    const renderPendingTasks = () => {
        const nearestTasks = scheduledTasks.filter(({scheduledTo}) => {
            const delta = scheduledTo.getTime() - now.getTime();
            return (delta > 0) && (delta < PENDING_TASK_SHOW_OFFSET)
        })
        if (nearestTasks.length === 0) {
            return "None"
        }

        return nearestTasks.map((task) => <span>{task.content}</span>)
    }

    const renderRunningTasks = () => {
        
        const currentlyRunningTasks = scheduledTasks.filter(({scheduledTo}) => {
            const delta = (now.getTime() - scheduledTo.getTime())
            return delta > 0 && delta < RUNNING_TASK_SHOW_OFFSET
        })

        if (currentlyRunningTasks.length === 0) {
            return "None"
        }

        return currentlyRunningTasks.map((task) => <span>{task.content}</span>)
    }

    return (<>
        <h3>
            Starting soon: 
        </h3>
        <div>{renderPendingTasks()}</div>

        <h3>
            Currently running: 
        </h3>
        <div>{renderRunningTasks()}</div>
    </>)
}
export default NotificationPanel;