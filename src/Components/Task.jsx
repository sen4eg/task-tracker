import { useTasks } from "../taskstorage/TasksProvider";

const Task = (props) => {
    const value = props.value;

    const {removeByIDnCol,swapColumns} = useTasks()

    let classes = ['task'];
    if(props.finished){
        classes.push(' -finished');
    }

    return (
        
        <div className={classes.join('')}>
            <input type='button' onClick={()=>swapColumns({id: props.id, finished: props.finished, value})}/>
            {value}
            <input type='button' onClick={()=>removeByIDnCol( {id: props.id, finished: props.finished} )}/>
        </div>
    )
}
export default Task;