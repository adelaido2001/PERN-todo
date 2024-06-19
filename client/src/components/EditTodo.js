import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
    // useState hook to manage the description state
    const [description, setDescription] = useState(todo.description);

    // Function to handle updating the todo description
    const updateDescription = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const body = { description }; // Create an object with updated description
            // Make a PUT request to update the todo item
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body) // Convert body object to JSON string
            });

            // After updating, redirect to the home page
            window.location = "/";

        } catch (err) {
            console.error(err.message); // Log any errors to the console
        }
    };

    // Render JSX for the EditTodo component
    return (
        <Fragment>
            {/* Edit button that triggers the modal */}
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            {/* Modal dialog for editing todo */}
            <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* Modal header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            {/* Close button in modal header */}
                            <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                        </div>

                        {/* Modal body with input field for editing description */}
                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>

                        {/* Modal footer with update and close buttons */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e)}>Update</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;