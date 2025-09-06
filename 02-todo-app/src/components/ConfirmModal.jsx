import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
