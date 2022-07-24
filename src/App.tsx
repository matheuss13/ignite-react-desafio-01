import { Header } from "./components/Header";
import { Task } from "./components/Task";

import styles from "./App.module.css";
import "./global.css";

function App() {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Task />
      </div>
    </div>
  );
}

export default App;
