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
          <TaskColumn columnTitle='TODO' showFinishedTasks={false}/>
          <TaskColumn columnTitle='DONE' showFinishedTasks={true}/>
        </div>
      </div>
    </TasksProvider>
  );
}

export default App;
