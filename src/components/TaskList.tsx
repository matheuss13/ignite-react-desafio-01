import { useState } from "react";
import { CheckCircle, Trash } from "phosphor-react";

import styles from "./TaskList.module.css";

import checkedSvg from "../assets/checked.svg";

interface TaskProps {
  task: TaskContent;
  onChangeStatus: (task: TaskContent) => void;
  onDeleteTask: (task: TaskContent) => void;
}

interface TaskContent {
  id: Number;
  finished: boolean;
  text: string;
}

export function TaskList({ task, onChangeStatus, onDeleteTask }: TaskProps) {
  const [btnRadioActive, setBtnRadioActive] = useState(false);

  function handleChangeTask() {
    onChangeStatus(task);
    setBtnRadioActive(!btnRadioActive);
  }

  function handleDeleteTask() {
    onDeleteTask(task);
  }

  return (
    <div>
      <div className={styles.card}>
        <article>
          {!btnRadioActive ? (
            <button
              className={styles.btnCreatedTask}
              onClick={handleChangeTask}
            ></button>
          ) : (
            <button
              className={styles.btnFinishedTask}
              onClick={handleChangeTask}
            >
              <img src={checkedSvg} />
            </button>
          )}
          <div className={styles.text}>
            <label>{!task.finished ? task.text : <s>{task.text}</s>}</label>
          </div>
        </article>
        <button className={styles.btnDeleteTask} onClick={handleDeleteTask}>
          <Trash />
        </button>
      </div>
    </div>
  );
}
