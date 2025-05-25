    import React, { useState } from 'react';

    function App() {
      // State to hold the list of to-do items. Each item is an object: { id, text, completed }
      const [todos, setTodos] = useState([]);
      // State to hold the text currently being typed into the input field
      const [newTodoText, setNewTodoText] = useState('');

      // Function to add a new to-do item
      const addTodo = () => {
        // Trim whitespace from the input text
        if (newTodoText.trim() === '') return; // Don't add empty todos

        const newTodo = {
          id: Date.now(), // Simple unique ID based on current timestamp
          text: newTodoText.trim(),
          completed: false, // New todos are not completed by default
        };

        setTodos([...todos, newTodo]); // Add the new todo to the existing list
        setNewTodoText(''); // Clear the input field after adding
      };

      // Function to toggle the 'completed' status of a to-do item
      const toggleTodo = (id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo // Toggle completed status for the matching todo
          )
        );
      };

      // Function to delete a to-do item
      const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id)); // Remove the todo with the matching id
      };

      return (
        // Main container for the app, centered on the screen with a background gradient
        <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex flex-col items-center justify-center p-4 font-sans">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg text-gray-800">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">My React To-Do List</h1>

            {/* Input and Add Button Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Add a new to-do..."
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-lg"
                value={newTodoText} // Input value is controlled by 'newTodoText' state
                onChange={(e) => setNewTodoText(e.target.value)} // Update state on input change
                onKeyPress={(e) => { // Allow adding on Enter key press
                  if (e.key === 'Enter') {
                    addTodo();
                  }
                }}
              />
              <button
                onClick={addTodo} // Add todo on button click
                className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg text-lg font-semibold"
              >
                Add To-Do
              </button>
            </div>

            {/* To-Do List Section */}
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 text-xl italic mt-4">No to-dos yet! Add some above.</p>
            ) : (
              <ul className="space-y-4">
                {/* Map over the 'todos' array to render each to-do item */}
                {todos.map((todo) => (
                  <li
                    key={todo.id} // Unique key for each list item (important for React performance)
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    {/* To-do text and checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={todo.completed} // Checkbox state is controlled by 'todo.completed'
                        onChange={() => toggleTodo(todo.id)} // Toggle completed status on change
                        className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className={`text-xl ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.text}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => deleteTodo(todo.id)} // Delete todo on click
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    }

    export default App;
    