import { useReducer, createContext, useContext } from 'react';
import uniqueId from 'lodash.uniqueid';
/*** 
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

const TasksReducer = (state, action) => {
    const { type, payload } = action;
    const { finished, open } = state
    switch (type) {
        case 'ADD': {
            const { finished: isFinished, content, id } = payload;
            if (isFinished) {
                return {open, finished: [...finished, {content, id}]}
            } else {
                return {open: [...open, {content, id}], finished}
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

    const addByValue = payload => dispatch({type:'ADD', payload: {...payload, id: uniqueId("task-")}});
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
    
    return (
        <TasksContext.Provider value={{
            tasks, addByValue, removeByIDnCol, swapColumns}}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;