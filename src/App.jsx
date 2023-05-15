import './App.css'
import {useEffect, useState} from "react";
import {getAllTasks} from "./assets/helpers/api.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=> {
    getAllTasks().then((data)=>{
      setTasks(data)
    })
        .catch(console.error)
  },[])


  async function sendTaskData(data) {
    const response = await fetch(
        'http://localhost:3000/tasks',
        {
          headers: {
            'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify(data)
          }
    )
    return response.json()
  }

async function handleSubmit(event){
    event.preventDefault()
    const result = await sendTaskData({
      title, description, status: "open", addedDate: new Date()
    })
    setTitle('');
    setDescription('')
    setTasks([...tasks, result])
}
    async function deleteTaskAPI(id) {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {method: 'DELETE'})
        return response.json();
    }

    async function handleDeleteTask(event) {
      const id = +event.target.dataset.id
        await deleteTaskAPI(id);
        setTasks(tasks.filter((task) => task.id !== id))
    }


  return (
    <>

      <form
        onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
              value={title}
              type="text"
              id="title"
              name="title"
              onChange={(event) => setTitle(event.target.value)}
              />
        </div>
        <div>
          <label htmlFor="desc">Description</label>
          <textarea
              value={description}
              id="desc"
              name="desc"
              onChange={(event) => setDescription(event.target.value)}
              />
        </div>
        <button type="submit">Add</button>
      </form>
        <br/>
      <section>
          {tasks.map((task) => (
              <div key={task.id}>
                  <b>{task.title}</b> - <span>{task.description}</span>
                  <button>Add operation</button>
                  <button>Finish</button>
                  <button onClick={handleDeleteTask} data-id={task.id}>Delete</button>
              </div>
          ) )}

      </section>


    </>
  )
}

export default App
