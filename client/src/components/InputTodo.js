import React, { Fragment, useState } from "react";

const InputTodo = () => {
    // useState hook to manage the description state
    const [description, setDescription] = useState("");

    // Function to handle form submission
    const onSubmitForm = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const body = { description }; // Create an object with the input description
            // Make a POST request to add a new todo item
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body) // Convert body object to JSON string
            });

            // After adding, redirect to the home page
            window.location = "/";

        } catch (err) {
            console.error(err.message); // Log any errors to the console
        }
    };

    // Render JSX for the InputTodo component
    return (
        <Fragment>
            {/* Title for the Todo List */}
            <h1 className="text-center mt-5">Peachy To-do List</h1>
            
            {/* Form for adding a new todo */}
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                {/* Input field for entering todo description */}
                <input 
                    type="text" 
                    className="form-control" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                
                {/* Submit button to add the todo */}
                <button className="btn btn-success"> ADD </button>
            </form>
        </Fragment>
    );
};

export default InputTodo;