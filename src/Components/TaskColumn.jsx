import {useRef} from 'react';
import Task from "./Task"
import { useTasks } from "../taskstorage/TasksProvider";


const TaskColumn = ({ columnTitle, showFinishedTasks }) => {
    const { tasks, addByValue } = useTasks();
    const inputRef = useRef(null);
    const renderTasks = () => {        
        const tasksToRender = showFinishedTasks ? tasks.finished : tasks.open
        return tasksToRender.map(({content, id}) => (
            <Task content={content} id={id} key={id} finished={showFinishedTasks}/>
        ))
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(!inputRef || !inputRef.current) {
            return;
        }

        const input = inputRef.current;
        addByValue({
            finished: showFinishedTasks,
            content: input.value
        });
        //input.blur();
        input.value = '';
    }

    return (
        <div className="task-column">
            <p>{columnTitle}</p>
            <form onSubmit={handleSubmitForm}>
                <input ref={inputRef} name="input-field"/>
                <input type="submit" className="hidden-sumbit-button" tabIndex="-1"/>
            </form>
            {renderTasks()}            
        </div>
    )
}
export default TaskColumn;