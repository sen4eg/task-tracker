import { useReducer, createContext, useContext } from 'react';
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
            const { finished: isFinished, content } = payload;
            if (isFinished) {
                return {open, finished: [...finished, content]}
            } else {
                return {open: [...open, content], finished}
            }
        }
        case 'REMOVE': {
            const { finished: isFinished, id } = payload;
            if (isFinished){
                return {open, finished: [...finished.slice(0, id), ...finished.slice(id + 1)]}
            } else {
                return {finished, open: [...open.slice(0, id), ...open.slice(id+1)] }
            }
        }
        default: return state
    }
}

const TasksProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(TasksReducer, initialValue);

    const addByValue = payload => dispatch({type:'ADD', payload});
    const removeByIDnCol = payload => dispatch({type:'REMOVE', payload});
    const swapColumns = payload => {
        dispatch({type:'REMOVE', payload}); 
        dispatch({
            type:'ADD', 
            payload: { 
                content: payload.value, 
                finished: !payload.finished 
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