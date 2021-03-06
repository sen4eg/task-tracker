import { useReducer, createContext, useContext } from 'react';
/*** 
 * Provides a little redux-alike storage using react hooks
 * 
 * 
 ***/

const deftasks = {
    finished:[],
    open:[]
}

export const TasksContext = createContext(deftasks);

export const useTasks = ()=>{
    return useContext(TasksContext);
}

const TasksReducer = (state, action) => {
    switch (action.type){
        case 'ADD': return {...state, ...(action.value.finished ? {finished:[...state.finished, action.value.content]}:{open:[...state.open, action.value.content]})}
        case 'REMOVE': return {...state}
        default: return state
    }
}

const TasksProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(TasksReducer, deftasks);

    const addByValue = value => dispatch({type:'ADD', value});
    const removeByID =   id  => dispatch({type:'REMOVE', id});
    
    return (
        <TasksContext.Provider value={{
            tasks, addByValue
        }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;