import "./App.css";
import { useEffect, useState } from "react";
import {
  deleteDataAPI,
  getDataAPI,
  sendDataAPI,
  updateDataAPI,
} from "./assets/helpers/api.js";
import AddOperation from "./components/AddOperation.jsx";
import AddTimeSpent from "./components/AddTimeSpent.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [operationId, setOperationId] = useState(null);
  const [timeSpentId, setTimeSpentId] = useState(null);

  useEffect(() => {
    const data = Promise.all([getDataAPI("tasks"), getDataAPI("operations")]);

    data
      .then((results) => {
        const [taskData, operationsData] = results;
        const tasks = taskData.map((task) => ({
          ...task,
          operations: operationsData.filter(
            (operation) => operation.taskId === task.id
          ),
        }));
        setTasks(tasks);
      })
      .catch(console.error);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await sendDataAPI(
      {
        title,
        description,
        status: "open",
        addedDate: new Date(),
      },
      "tasks"
    );
    setTitle("");
    setDescription("");
    setTasks([...tasks, result]);
  }

  async function handleDeleteTask(event) {
    const id = +event.target.dataset.id;
    await deleteDataAPI(id, "tasks");
    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function handleDeleteOperation(id) {
    await deleteDataAPI(id, "operations");
    setTasks(
      tasks.map((task) => {
        return {
          ...task,
          operations: task.operations.filter(
            (operation) => operation.id !== id
          ),
        };
      })
    );
  }

  function handleFinishTask(id) {
    return async function () {
      await updateDataAPI(
        {
          status: "closed",
        },
        "tasks",
        id,
        "PATCH"
      );

      setTasks(
        tasks.map((task) => ({
          ...task,
          status: task.id === id ? "closed" : task.status,
        }))
      );
    };
  }

  return (
    <>
      <h2 className="header">What to do?</h2>
      <div className="main-box-div">
        <header className="header-box">
          <form onSubmit={handleSubmit}>
            <div className="input_div">
              <label htmlFor="title">Title</label>
              <input
                className="header_input"
                value={title}
                type="text"
                id="title"
                name="title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="input_div">
              <label htmlFor="desc">Description</label>
              <textarea
                className="header_input"
                value={description}
                id="desc"
                name="desc"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <button type="submit">Add</button>
          </form>
        </header>
        <section className="content-box">
          {tasks.map((task) => (
            <div key={task.id}>
              <div className="task-style">
                <div className="task-title-style">
                  <b>{task.title}</b> - <span>{task.description}</span>
                </div>
                <div>
                  {operationId === task.id ? (
                    <AddOperation
                      taskId={task.id}
                      setOperationId={setOperationId}
                      setTasks={setTasks}
                    />
                  ) : (
                    <>
                      {task.status === "open" && (
                        <button onClick={() => setOperationId(task.id)}>
                          Add operation
                        </button>
                      )}
                    </>
                  )}
                  {task.status === "open" && (
                    <button onClick={handleFinishTask(task.id)}>Finish</button>
                  )}
                  <button onClick={handleDeleteTask} data-id={task.id}>
                    Delete
                  </button>
                </div>
              </div>
              <div className="subtask-style">
                {task.operations &&
                  task.operations.map((operation) => (
                    <div key={operation.id} className="one_subtask-style">
                      <span>{operation.description}: </span>
                      {operation.timeSpent ? (
                        <b>
                          {~~(operation.timeSpent / 60)}h{" "}
                          {operation.timeSpent % 60}
                          min
                        </b>
                      ) : (
                        ""
                      )}
                      <div>
                        {operation.id === timeSpentId ? (
                          <AddTimeSpent
                            operationId={operation.id}
                            spentTime={operation.timeSpent}
                            setTasks={setTasks}
                            setTimeSpentId={setTimeSpentId}
                          />
                        ) : (
                          <>
                            {task.status === "open" && (
                              <button
                                onClick={() => setTimeSpentId(operation.id)}
                              >
                                Add Spent Time
                              </button>
                            )}
                          </>
                        )}
                        {task.status === "open" && (
                          <button
                            onClick={() => handleDeleteOperation(operation.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
