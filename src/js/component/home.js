import React, { useState, useEffect } from "react";

const Home = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    const inputKeyPress = (event) => {
        if (event.key === "Enter" && input.trim() !== "") {
            setTodos([...todos, { label: input }]);
            setInput("");
        }
    };

    const deleteTodo = (index) => {
        return () => {
            setTodos(todos.filter((_, i) => i !== index));
        };
    };

    const urlTodos = "https://playground.4geeks.com/apis/fake/todos/user/denis9diaz";

    //GET
    useEffect(() => {
        getTask();
    }, []);

    const getTask = () => {
        fetch(urlTodos)
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((err) => (err));
    };

    //POST
    useEffect(() => {
        newTask();
    }, [todos]);

    const newTask = () => {
        fetch(urlTodos, {
            method: "POST",
            body: JSON.stringify(todos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => (err));
    };

    //PUT
    useEffect(() => {
        updateTodo();
    }, []);

    const updateTodo = () => {
        fetch(urlTodos, {
            method: "PUT",
            body: JSON.stringify(todos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => (err));
    };

    return (
        <div className="list container">
            <h2 className="title">TODOS LIST</h2>
            <ul className="list-group">
                <li className="list-group-item">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={inputKeyPress}
                    />
                </li>
                {todos.map((todo, index) => (
                    <li className="list-group-item" key={index}>
                        {todo.label}
                        <button
                            type="button"
                            className="btn deleteButton"
                            onClick={deleteTodo(index)}
                        >
                            X
                        </button>
                    </li>
                ))}
                <li className="tasks list-group-item">{todos.length} tasks</li>
            </ul>
        </div>
    );
};

export default Home;
