import { useEffect, useState } from "react";
import "./App.css";
import { getTasks } from "./services/api";

function App() {
  const [list, setList] = useState("");

  useEffect(() => {
    getTasks().then((result) => {
      setList(result);
      console.log(result);
    });
  }, []);

  console.log(list);

  return (
    <div className="app">
      <h1 className="text-slate-800 text-center p-4">To-Do List</h1>

      <form className="">
        <input type="text" placeholder="Adicione uma nova tarefa..." />
        <button type="submit" className="bg-blue-800 text-center p-3">
          Adicionar
        </button>
      </form>

      <ul className="list-none p-2 m-0 rounded-lg" id="tasks">
        {list && list.length > 0 && (
          <ul>
            {list.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}

export default App;
