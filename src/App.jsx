import { useEffect, useState } from "react";
import "./App.css";
import { getTasks, deleteTask } from "./services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [list, setList] = useState("");

  useEffect(() => {
    getTasks().then((result) => {
      setList(result);
    });
  }, []);

  console.log(list);

  const deleteTaskExecuter = function(id) {
    deleteTask(id).then(() => {
      getTasks().then((result) => {
        setList(result);
      }); 
    });
  };

  return (
    <div className="app">
      <h1 className="text-slate-800 text-center p-4">To-Do List</h1>

      <form className="">
        <input type="text" placeholder="Adicione uma nova tarefa..." />
        <button
          type="submit"
          id="submit-button"
          className="bg-blue-800 text-center p-3 hover:bg-blue-900"
        >
          Adicionar
        </button>
      </form>

      <ul className="list-none p-2 m-0 rounded-lg" id="tasks">
        {list && list.length > 0 && (
          <ul>
            {list.map((item) => (
              <li
                key={item.id}
                className={
                  "flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2" +
                  (item.status === "deleted" ? " bg-red-200" : "")
                }
              >
                <span>{item.title}</span>
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 left"
                    onClick={() => deleteTaskExecuter(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}

export default App;

// <div className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}>
