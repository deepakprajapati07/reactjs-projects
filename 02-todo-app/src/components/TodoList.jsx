import styles from "./TodoList.module.css";
import { TodoContext } from "../context/TodoContext";
import { useContext, useState } from "react";
import TodoItem from "./TodoItem";
import CurrentDate from "./CurrentDate";
import ConfirmModal from "./ConfirmModal";

const TodoList = () => {
  const { todos, remainingCount, clearCompleted } = useContext(TodoContext);
  const [showModal, setShowModal] = useState(false);

  const handleClearCompleted = () => setShowModal(true);
  const confirmClear = () => { clearCompleted(); setShowModal(false); };
  const cancelClear = () => setShowModal(false);

  // Split todos
  const incompleteTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <section className={styles.mainContainer}>
      <div className={styles.todoListContainer}>
        <CurrentDate />

        <p className={styles.remaining}>
          {remainingCount} task{remainingCount !== 1 ? "s" : ""} remaining
        </p>

        {/* Active / incomplete todos */}
        {incompleteTodos.length === 0 ? (
          <p className={styles.remaining}>No active todos!</p>
        ) : (
          incompleteTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}

        {/* Clear Completed button */}
        {completedTodos.length > 0 && (
          <button className={styles.clearBtn} onClick={handleClearCompleted}>
            Clear Completed
          </button>
        )}

        {/* Completed todos */}
        {completedTodos.map((todo) => (
          <div key={todo.id} className={styles.completedTodo}>
            <TodoItem todo={todo} />
          </div>
        ))}

        {/* Modal */}
        {showModal && (
          <ConfirmModal
            message="Are you sure you want to clear all completed tasks?"
            onConfirm={confirmClear}
            onCancel={cancelClear}
          />
        )}
      </div>
    </section>
  );
};

export default TodoList;
