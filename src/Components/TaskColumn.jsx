import Task from "./Task"
import { useTasks } from "../taskstorage/TasksProvider";

const TaskColumn = (props) => {
    const {columnTitle} = props;
    const {tasks, addByValue} = useTasks();
    const populateTasks = () => {
        //console.log(tasks);
        if(tasks === undefined)
            return;
        if (props.finishRepresentant){
            return tasks.finished.map((task, _id) => <Task value={task} id={_id} key={_id} finished={true}/>);
        }
        else{
            return tasks.open.map((task, _id) => <Task value={task} id={_id} key={_id}/>);    
        }
    }

    const handleTaskAdded = (e) => {
        //console.log('31,', e);
        if(e.target.firstChild.value.length <= 0)
            return;

        e.target.firstChild.blur();
        addByValue({
            finished: props.finishRepresentant === true,
            content: e.target.firstChild.value
        });
        e.target.firstChild.value = '';
    }

    return (
        <div className="task-column">
            <p>{columnTitle}</p>
            <form onSubmit={(e)=>{e.preventDefault();handleTaskAdded(e);}}>
                <input name="input-field"/>
                <input type="submit" className="hidden-sumbit-button" tabIndex="-1"/>
            </form>
            {populateTasks()}            
        </div>
    )
}
export default TaskColumn;