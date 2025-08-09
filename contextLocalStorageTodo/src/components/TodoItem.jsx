import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoText, setTodoText] = useState(todo.todo)
    const {updateTodo, deleteTodo, toggleComplete} = useTodo()

    //edit function
    const editTodo = () => {
        updateTodo(todo.id, {...todo, todo: todoText})
        setIsTodoEditable(false)
    }

    //toggle completed function
    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`flex border border-black/20 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#acf5bf]" : "bg-[#b0cfe6]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer size-6 mt-1 accent-slate-800 bg-amber-300"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className={`inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 
                    justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50
                    ${todo.completed ? "cursor-not-allowed" : "pointer"}`}
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {/* {isTodoEditable ? "📁" : "✏️"} */}
                {isTodoEditable ? 
                    <svg class="w-6 h-6 text-gray-800 dark:text-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd"/>
                    </svg>
                  

                    : 
                    <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>

                }
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
