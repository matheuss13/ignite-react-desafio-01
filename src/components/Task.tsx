import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { PlusCircle } from "phosphor-react";

import styles from "./Task.module.css";
import { TaskList } from "./TaskList";

import clipboard from "../assets/clipboard.svg";

interface Task {
  id: Number;
  finished: boolean;
  text: string;
}

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTask] = useState("");
  const [finishedTasksCounter, setFinishedTasksCounter] = useState(0);

  const newTaskInputIsEmpty = newTaskText.length === 0;

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: Math.floor(Math.random() * 999),
      finished: false,
      text: newTaskText,
    };

    setTasks([...tasks, newTask]);

    setNewTask("");
  }

  function handleChangeTaskStatus(task: Task) {
    task.finished = !task.finished;

    setFinishedTasksCounter((state) => {
      return task.finished ? state + 1 : state - 1;
    });
  }

  function handleDeleteTask(taskToDelete: Task) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task !== taskToDelete;
    });

    setTasks(tasksWithoutDeletedOne);

    setFinishedTasksCounter((state) => {
      return taskToDelete.finished ? state - 1 : state;
    });
  }

  return (
    <div>
      <form className={styles.newTaskForm} onSubmit={handleCreateNewTask}>
        <input
          className={styles.iptNewTask}
          placeholder="Adicione uma nova tarefa"
          type="text"
          name="newTask"
          autoComplete="off"
          onChange={handleNewTaskChange}
          value={newTaskText}
          onInvalid={handleNewTaskInvalid}
          maxLength={100}
          required
        />

        <button
          type="submit"
          className={styles.btnCreate}
          disabled={newTaskInputIsEmpty}
        >
          Criar <PlusCircle />
        </button>
      </form>

      <div className={styles.tasks}>
        <div className={styles.textCounters}>
          <p className={styles.createdTasksCounters}>
            Tarefas criadas <span>{tasks.length}</span>
          </p>
          <p className={styles.finishedTasksCounters}>
            Concluídas{" "}
            <span>
              {finishedTasksCounter > 0
                ? finishedTasksCounter + " de " + tasks.length
                : 0}
            </span>
          </p>
        </div>

        {tasks.length > 0 ? (
          <div className={styles.tasksList}>
            {tasks.map((task) => (
              <TaskList
                key={String(task.id)}
                task={task}
                onChangeStatus={handleChangeTaskStatus}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyTasks}>
            <img src={clipboard} />
            <p className={styles.emptyTasksText}>
              Você ainda não tem tarefas cadastradas
              <br />
              <span>Crie tarefas e organize seus itens a fazer</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
