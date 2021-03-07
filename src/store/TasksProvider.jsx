import { useReducer, createContext, useContext } from 'react';
import uniqueId from 'lodash.uniqueid';
/*** )
 * Provides a little redux-alike storage using react hooks
 * 
 ***/

const initialValue = {
    finished:[],
    open:[]
}

export const TasksContext = createContext(initialValue);

export const useTasks = ()=>{
    return useContext(TasksContext);
}

const updateTaskById = (taskId, taskList, props) => {
    const taskIndex = taskList.findIndex(({id}) => id === taskId)
    if (taskIndex === -1) {
        return taskList;
    }
    const oldTask = taskList[taskIndex];
    const updatedTask = {...oldTask, ...props}
    return [...taskList.slice(0, taskIndex), updatedTask, ...taskList.slice(taskIndex + 1)]
}

const TasksReducer = (state, action) => {
    const { type, payload } = action;
    const { finished, open } = state
    switch (type) {
        case 'ADD': {
            const { finished: isFinished, content, id, scheduledTo } = payload;
            const newTask = {content, id, scheduledTo};
            if (isFinished) {
                return {open, finished: [...finished, newTask]}
            } else {
                return {open: [...open, newTask], finished}
            }
        }
        case 'CHANGE': {
            const {id, updatedProps} = payload;
            return {
                open:     updateTaskById(id, open, updatedProps),
                finished: updateTaskById(id, finished, updatedProps)
            }
        }
        case 'REMOVE': {
            const { finished: isFinished, id } = payload;
            if (isFinished){
                return {open, finished: finished.filter((task)=> task.id !== id) }
            } else {
                return {finished, open: open.filter((task) => task.id !== id) }
            }
        }
        default: return state
    }
}

const TasksProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(TasksReducer, initialValue);

    const addByValue = payload => dispatch({type:'ADD', payload: {...payload, id: uniqueId("task-"), scheduledTo: null}});
    const removeByIDnCol = payload => dispatch({type:'REMOVE', payload});
    const swapColumns = payload => {
        dispatch({type:'REMOVE', payload}); 
        dispatch({
            type:'ADD', 
            payload: { 
                ...payload,
                finished: !payload.finished,
            }
        });
    }
    const changeTask = payload => dispatch({type:'CHANGE', payload});
    return (
        <TasksContext.Provider value={{
            tasks, addByValue, removeByIDnCol, swapColumns, changeTask
        }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;