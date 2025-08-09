import {createContext, useContext} from "react"

//create a context
export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "This is a todo message",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

//useTodo function that returns the useContext
export const useTodo = () => {
    return useContext(TodoContext)
}

//a todo provider
export const TodoProvider = TodoContext.Provider