import TaskColumn from "./Components/TaskColumn";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Task tracker
        </p>
      </header>
      <div className="task-table">
        <TaskColumn columnTitle='TODO'/>
        <TaskColumn columnTitle='DONE'/>
      </div>
    </div>
  );
}

export default App;
