import TaskColumn from "./Components/TaskColumn";
import TasksProvider from "./taskstorage/TasksProvider";


function App() {
  return (
    <TasksProvider>
      <div className="App">
        <header className="App-header">
          <p>
            Task tracker
          </p>
        </header>
        <div className="task-table">
          <TaskColumn columnTitle='TODO'/>
          <TaskColumn columnTitle='DONE' finishRepresentant={true}/>
        </div>
      </div>
    </TasksProvider>
  );
}

export default App;
