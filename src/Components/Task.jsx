import { useTasks } from "../taskstorage/TasksProvider";

const Task = ({ content, finished, id }) => {
    const { removeByIDnCol, swapColumns } = useTasks()
    const classNames = finished ? 'task -finished' : 'task';
    return (        
        <div className={classNames}>
            <input type='checkbox' checked={finished} onClick={()=>swapColumns({id, finished, content})}/>
            {content}                 
            <input type='button' value="Delete" onClick={()=>removeByIDnCol({id, finished})}/>
        </div>
    )
}
export default Task;