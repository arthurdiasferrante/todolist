import axios from "axios";
import { Result } from "postcss";
import React from "react";

const API_URL = "https://67b0f68a3fc4eef538e8dafb.mockapi.io/todolist";

export async function getTasks() {
  return await axios.get(API_URL).then((response) => response.data);

  return response;
}

export async function createTask(titulo) {
  console.log(titulo);
  const response = await axios.post(API_URL, {
    title: titulo,
    status: "pending",
  });
}

export async function deleteTask(id) {
  const response = await axios.put(`${API_URL}/${id}`, {
    status: "deleted",
  });
}
