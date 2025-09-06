import styles from "./TodoItem.module.css";
import { TodoContext } from "../context/TodoContext";
import { useContext, useState } from "react";
import { MdDeleteForever, MdSave, MdCancel } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text); // reset back to original
    setIsEditing(false);
  };

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todo}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            autoFocus
          />
        ) : (
          <span className={todo.completed ? styles.completed : ""}>
            {todo.text}
          </span>
        )}
      </div>

      <div className={styles.buttons}>
        {!todo.completed && (
          isEditing ? (
            <>
              <button className={styles.saveBtn} onClick={handleEdit}>
                <MdSave size={28} />
              </button>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                <MdCancel size={28} />
              </button>
            </>
          ) : (
            <button
              className={styles.editBtn}
              onClick={() => setIsEditing(true)}
            >
              <TbEdit size={28} />
            </button>
          )
        )}


        <button
          className={styles.deleteBtn}
          onClick={() => deleteTodo(todo.id)}
        >
          <MdDeleteForever size={28} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
