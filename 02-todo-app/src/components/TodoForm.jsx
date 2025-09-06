import { useState, useContext } from "react";
import { HiPlusCircle } from "react-icons/hi";
import styles from "./TodoForm.module.css";
import { TodoContext } from "../context/TodoContext.js";

const TodoForm = () => {
  const [todoInput, setTodoInput] = useState("");
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todoInput);
    addTodo(todoInput);
    setTodoInput(""); // clear input after adding
  };

  return (
    <div className={styles.container}>
      <form className={styles.InputForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo here ..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />

        <button className={styles.btn} type="submit">
          <HiPlusCircle size={40} />
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
