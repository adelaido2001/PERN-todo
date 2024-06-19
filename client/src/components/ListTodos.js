import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    // useState hook to manage the todos state
    const [todos, setTodos] = useState([]);

    // Function to delete a todo item
    const deleteTodo = async (id) => {
        try {
            // Make a DELETE request to delete the todo item with specified id
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            // Update the todos state to remove the deleted todo item
            setTodos(todos.filter(todo => todo.todo_id !== id));
            
        } catch (err) {
            console.log(err.message); // Log any errors to the console
        }
    };

    // Function to fetch todos from the backend
    const getTodos = async () => {
        try {
            // Make a GET request to fetch all todos
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json(); // Parse the response as JSON
            setTodos(jsonData); // Update the todos state with the fetched data
        } catch (err) {
            console.error(err.message); // Log any errors to the console
        }
    };

    // useEffect hook to fetch todos when the component mounts
    useEffect(() => {
        getTodos(); // Call getTodos function when the component mounts
    }, []); // Empty dependency array ensures useEffect runs only once after initial render

    // Render JSX for the ListTodos component
    return (
        <Fragment>
            {/* Table to display todos */}
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping over todos array to display each todo */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                {/* Render EditTodo component with todo prop */}
                                <EditTodo todo={todo} />
                            </td>
                            <td>
                                {/* Delete button with onClick handler */}
                                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;