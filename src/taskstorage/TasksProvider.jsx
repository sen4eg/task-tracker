import { useReducer, createContext, useContext } from 'react';
/*** 
 * Provides a little redux-alike storage using react hooks
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
        case 'ADD': return {...state, 
            ...(action.valncol.finished ? 
                {finished:[...state.finished, action.valncol.content]}:
                {open:[...state.open, action.valncol.content]})
            }
        case 'REMOVE': return {...state,
            ...(action.idncol.finished ? {finished: [...state.finished.slice(0, action.idncol.id), ...state.finished.slice(action.idncol.id + 1)]}:
                {open: [...state.open.slice(0, action.idncol.id), ...state.open.slice(action.idncol.id + 1)]})}
        default: return state
    }
}

const TasksProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(TasksReducer, deftasks);

    const addByValue = valncol => dispatch({type:'ADD', valncol});
    const removeByIDnCol = idncol => {dispatch({type:'REMOVE', idncol});}
    const swapColumns = idcolval => {dispatch({type:'REMOVE', idncol:{...idcolval}});
                                    dispatch({type:'ADD', valncol:{content:idcolval.value, finished: !idcolval.finished}});}

    
    return (
        <TasksContext.Provider value={{
            tasks, addByValue, removeByIDnCol, swapColumns
        }}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;