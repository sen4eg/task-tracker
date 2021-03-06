
const Task = (props) => {
    const value = props.value;
    return (
        <div className="task">
            {value}
        </div>
    )
}
export default Task;