import { useTasks } from "../store/TasksProvider";
import DeleteButton from "./DeleteButton";
import TimePicker from 'react-time-picker'

const Task = ({ content, finished, id, scheduledTo,  }) => {
    const { removeByIDnCol, swapColumns, changeTask } = useTasks()
    
    const changeScheduledTime = (taskId, newTime) => {
        changeTask({id: taskId, updatedProps: {scheduledTo: newTime}})
    }

    const handleScheduledToChange = (newTime) => {
        if (newTime === null) {
            return;
        }
        const [hours, minutes] = newTime.split(":")
        //console.log(hours, minutes)
        const newDate = new Date()
        newDate.setHours(+hours)
        newDate.setMinutes(+minutes)
        newDate.setSeconds(0)
        //console.log("new date", newDate)

        changeTask({id, updatedProps: {scheduledTo: newDate}})
    }
    const classNames = finished ? 'task -finished' : 'task';

    const handleAddSchedule = (evt) => {
        const newScheduleTo = new Date((new Date().getTime() + 1000*60*60))
        changeScheduledTime(id, newScheduleTo)
    }

    const renderTimePicker = () => {
        if (scheduledTo) {
            const scheduledTimeLabel = `${scheduledTo.getHours()}:${scheduledTo.getMinutes()}`
            return (
                <TimePicker
                    onChange={handleScheduledToChange}
                    value={scheduledTimeLabel}
                    format="HH:mm"
                    disableClock={true}
                    //closeClock={false}
                    clearIcon={null}
                />
            )
        } else {
            return <input type='button' value="Schedule time" onClick={handleAddSchedule} />
        }
    }

    return (        
        <div className={classNames}>
            <input readOnly type='checkbox' checked={finished} onClick={()=>swapColumns({id, finished, content, scheduledTo})}/>
            <label>{content}</label>   
            {renderTimePicker()}
                          
            <DeleteButton onClick={()=>removeByIDnCol({id, finished})}/>
        </div>
    )
}
export default Task;