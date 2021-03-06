import Task from "./Task"

const TaskColumn = (props) => {
    const {columnTitle} = props;
    return (
        <div className="task-column">
            <p>{columnTitle}</p>
            <form onSubmit={(e)=>{e.preventDefault();console.log(e); alert('Task added!')}}>
                <input/>
                <input type="submit" className="hidden-sumbit-button" tabindex="-1"/>
            </form>
            <Task/>
            <Task/>
            <Task/>
            
        </div>
    )
}
export default TaskColumn;