import { useEffect, useState } from "react";
import "./App.css";
import { getTasks, deleteTask, createTask } from "./services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [list, setList] = useState("");

  // pega as tarefas

  useEffect(() => {
    getTasks().then((result) => {
      setList(result);
    });
  }, []);

  // digitar tarefas novas

  const [tarefa, setTarefa] = useState("");

  const [alerta, setAlerta] = useState(false);

  // alerta de texto vazio

  function taskAlert({ condition }) {
    return (
      condition && <span className="text-red-600">Você não digitou nada!</span>
    );
  }

  // botao que lanca tarefas novas

  const submitTask = (event) => {
    event.preventDefault();
    if (tarefa === "") {
      setAlerta(true);
      return;
    }
    createTask(tarefa).then(() => {
      getTasks().then((result) => {
        setList(result);
        setTarefa("");
        setAlerta(false);
      });
    });
  };

  // botao que deleta as tarefas

  const deleteTaskExecuter = function (id) {
    deleteTask(id).then(() => {
      getTasks().then((result) => {
        setList(result);
      });
    });
  };

  return (
    <div className="app">
      <h1 className="text-slate-800 text-center p-4">To-Do List</h1>

      <form onSubmit={submitTask} className="">
        <div className="form-box">
          <input
            type="text"
            placeholder="Adicione uma nova tarefa..."
            value={tarefa}
            onChange={(event) => setTarefa(event.target.value)}
          />
          <button
            type="submit"
            id="submit-button"
            className="bg-blue-800 text-center p-3 hover:bg-blue-900"
          >
            Adicionar
          </button>
        </div>
        {taskAlert({ condition: alerta })}
      </form>

      <ul className="list-none p-2 m-0 rounded-lg" id="tasks">
        {list && list.length > 0 && (
          <ul>
            {list.map((item) => (
              <li
                key={item.id}
                className={
                  "flex justify-between items-center p-2 bg-gray-100 rounded-lg mb-2" +
                  (item.status === "deleted" ? "bg-red-200" : "")
                }
              >
                <span
                  className={item.status === "deleted" ? "animated-spin" : ""}
                >
                  {item.title}
                </span>
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
