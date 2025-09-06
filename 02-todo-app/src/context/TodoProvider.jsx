import { useReducer, useEffect } from "react";
import { TodoContext } from "./TodoContext";

// Reducer function
const sortTodos = (todos) => {
  return [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1; // false (incomplete) first
  });
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      if (!action.payload.trim()) return state;
      return sortTodos([
        { id: Date.now(), text: action.payload, completed: false },
        ...state
      ]);

    case "TOGGLE_TODO":
      return sortTodos(
        state.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
};


export const TodoProvider = ({ children }) => {
  // Load from localStorage initially
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Derived state
  const remainingCount = todos.filter((t) => !t.completed).length;

  // Context value
  const value = {
    todos,
    addTodo: (text) => dispatch({ type: "ADD_TODO", payload: text }),
    toggleTodo: (id) => dispatch({ type: "TOGGLE_TODO", payload: id }),
    deleteTodo: (id) => dispatch({ type: "DELETE_TODO", payload: id }),
    editTodo: (id, text) => dispatch({ type: "EDIT_TODO", payload: { id, text } }),
    clearCompleted: () => dispatch({ type: "CLEAR_COMPLETED" }),
    remainingCount
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
