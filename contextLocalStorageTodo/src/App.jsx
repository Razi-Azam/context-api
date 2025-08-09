import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import { TodoItem } from "./components";
//unique ids generation
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todos, setTodos] = useState([]);

  //addTodo function
  const addTodo = (todo) => {
    setTodos((prev) => [{id: uuidv4(), ...todo}, ...prev])
  }

  //updateTodo function
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  //deleteTodo function
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  //toggleComplete function
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (
      prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
    )))
  }

  //useEffect for handling side effects
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#0e1d2de9] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {console.log(todos)}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
