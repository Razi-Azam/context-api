import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
    const [todo, setTodo] = useState("")
    //get the addtwo function from ueeContext which is returned by the useTodo function
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault();

        if(!todo) return

        addTodo({todo, completed: false})
        setTodo("")
    }

    return (
        <form onSubmit={add}  className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/10 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button 
                type="submit" 
                className="rounded-r-lg px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white shrink-0"
            >
                Add Todo
            </button>
        </form>
    );
}

export default TodoForm;