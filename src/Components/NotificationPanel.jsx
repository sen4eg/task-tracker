import { useTasks } from "../store/TasksProvider";

const PENDING_TASK_SHOW_OFFSET = 1000*60*15;
const RUNNING_TASK_SHOW_OFFSET = 1000*60*45;

const NotificationPanel = () => {
    const { tasks } = useTasks();
    const scheduledTasks = tasks.open.filter(({scheduledTo}) => !!scheduledTo)
    const now = new Date()

    const nearestTasks = scheduledTasks.filter(({scheduledTo}) => {
        const delta = scheduledTo.getTime() - now.getTime();
        return (delta > 0) && (delta < PENDING_TASK_SHOW_OFFSET)
    })

    const currentlyRunningTasks = scheduledTasks.filter(({scheduledTo}) => {
        const delta = (now.getTime() - scheduledTo.getTime())
        return delta > 0 && delta < RUNNING_TASK_SHOW_OFFSET
    })

    const renderPendingTasks = () => {
        if (nearestTasks.length === 0) {
            return;
        }

        const tasks = nearestTasks.map((task) => 
            <><span key={task.id}>{task.content}</span><br/></>)
        return (
            <>           
                <h3>
                    Starting soon: 
                </h3>
                <div>
                    {tasks}
                </div>
            </>
        );
    }

    const renderRunningTasks = () => {
        if (currentlyRunningTasks.length === 0) {
            return
        }
        
        const tasks = currentlyRunningTasks.map((task) => 
            <><span key={task.id }>{task.content}</span><br/></>)

        return (
            <>
                <h3>
                    Currently running: 
                </h3>
                <div>{tasks}</div>
            </>
        )
    }
    
    return (
        <div className="notification-panel">
            {renderPendingTasks()}
            {renderRunningTasks()}
        </div>)
    }
export default NotificationPanel;