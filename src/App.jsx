import './App.css'
import {useEffect, useState} from "react";
import {getAllTasks} from "./assets/helpers/api.js";

function App() {
  const [task, setTask] = useState([]);

  useEffect(()=> {
    getAllTasks().then((data)=>{
      setTask(data)
    })
        .catch(console.error)
  },[])






  return (
    <>
    </>
  )
}

export default App
