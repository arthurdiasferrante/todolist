import { useEffect, useState } from "react";
import "./App.css";
import { getTasks } from "./services/api";

function App() {
  getTasks();

  return (
    <div className="app">
      <h1 className="text-slate-800 text-center p-4">To-Do List</h1>

      <form className="">
        <input type="text" placeholder="Adicione uma nova tarefa..." />
        <button type="submit" className="bg-blue-800 text-center p-3">
          Adicionar
        </button>
      </form>

      <ul className="list-none p-2 m-0 rounded-lg">
        <li>passea com meg</li>
        <li>passea com digao</li>
        <li>oejkgwg</li>
        <li>rheahk</li>
      </ul>
    </div>
  );
}

export default App;
