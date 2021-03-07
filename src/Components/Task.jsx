import { useTasks } from "../taskstorage/TasksProvider";

const Task = ({ value, finished, id }) => {
    const { removeByIDnCol, swapColumns } = useTasks()
    
    const classNames = finished ? 'task -finished' : 'task';
    const toggleFinishStatusButtonText = finished ? "Mark unfinished" : "Mark finished"
    return (        
        <div className={classNames}>
            <input type='button' value={toggleFinishStatusButtonText} onClick={()=>swapColumns({id, finished, value})}/>
            {value}                 
            <input type='button' value="Delete" onClick={()=>removeByIDnCol({id, finished})}/>
        </div>
    )
}
export default Task;