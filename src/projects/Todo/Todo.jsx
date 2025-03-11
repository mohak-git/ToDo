import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
const localStorageKey = "reactTodo";

const getLocalStorageData = () => {
  const localStorageData = localStorage.getItem(localStorageKey);
  return localStorageData ? JSON.parse(localStorageData) : [];
};

const setLocalStorageData = (taskArray) => {
  localStorage.setItem(localStorageKey, JSON.stringify(taskArray));
};

export const Todo = () => {
  const [taskArray, setTaskArray] = useState(() => getLocalStorageData());
  setLocalStorageData(taskArray);

  return (
    <div className="wrapper h-screen w-screen bg-[#0d1b2a] flex justify-center items-center pt-10 pb-4 overflow-x-hidden">
      <section className="container h-full w-2/3 bg-[#8d99ae] shadow-[2px_2px_5px_0px_rgba(0,0,0),inset_2px_2px_5px_rgba(255,255,255)] flex flex-col items-center gap-4 py-4">
        <Header />

        <div className="form w-2/3 h-fit p-2 flex justify-center">
          <Form taskArray={taskArray} setTaskArray={setTaskArray} />
        </div>

        <div className="tasks w-4/5">
          <ul className="taskList flex flex-col gap-2 p-4">
            {taskArray.map((task, index) => {
              return (
                <Task
                  key={index}
                  name={task}
                  taskArray={taskArray}
                  setTaskArray={setTaskArray}
                />
              );
            })}
          </ul>
        </div>

        <Footer setTaskArray={setTaskArray} />
      </section>
    </div>
  );
};

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currTime =
    dateTime.toLocaleDateString() + " - " + dateTime.toLocaleTimeString();

  return (
    <header className="flex flex-col items-center gap-2">
      <h1 className="heading Monti text-[#3c096c]">Todo List</h1>
      <h2 className="dateTime PomPom text-xl text-[#000814]">{currTime}</h2>
    </header>
  );
};

const Form = ({ taskArray, setTaskArray }) => {
  const [newTaskFormInput, setNewTaskFormInput] = useState("");

  const handleOnClickButton = () => {
    if (!newTaskFormInput) return;

    if (taskArray.includes(newTaskFormInput)) {
      alert(`Task ${newTaskFormInput} already exists`);
      setNewTaskFormInput("");
      return;
    }

    setTaskArray([...taskArray, newTaskFormInput]);

    setNewTaskFormInput("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="inputTask my-8 w-full h-10 rounded-2xl flex text-black">
        <input
          type="text"
          className="h-full w-2/3 bg-white rounded-l-2xl px-2"
          placeholder="What's on your mind today?"
          value={newTaskFormInput}
          onChange={(e) => setNewTaskFormInput(e.target.value)}
        />

        <button
          type="submit"
          className="w-1/3 h-full rounded-r-2xl rounded-l-none bg-sky-300 p-2 border-none text-white"
          onClick={handleOnClickButton}
        >
          <span className="text-xs">Add Task</span>
        </button>
      </div>
    </form>
  );
};

const Task = ({ name, taskArray, setTaskArray }) => {
  const [isTaskDone, setIsTaskDone] = useState(false);

  const handleOnClickTick = () => {
    !isTaskDone
      ? document
          .querySelector(`.taskContent${name}`)
          .classList.add("line-through")
      : document
          .querySelector(`.taskContent${name}`)
          .classList.remove("line-through");

    setIsTaskDone(!isTaskDone);
  };

  const handleOnClickDelete = () => {
    setTaskArray(taskArray.filter((elem) => elem != name));
  };

  return (
    <li className="taskContainer bg-white text-black rounded-full flex justify-between items-center px-4">
      <span className={`taskContent${name} PomPom text-xl h-[50%]`}>
        {name}
      </span>
      <div className="h-full flex justify-between items-center gap-2">
        <button
          className="tickButton bg-transparent hover:bg-emerald-500 group border-none transition-all duration-500"
          onClick={handleOnClickTick}
        >
          <FaCheck className="fill-emerald-500 group-hover:fill-white transition-all duration-500" />
        </button>
        <button
          className="deleteButton bg-transparent hover:bg-red-500 group border-none transition-all duration-500"
          onClick={handleOnClickDelete}
        >
          <MdDeleteSweep className="fill-red-500 group-hover:fill-white transition-all duration-500" />
        </button>
      </div>
    </li>
  );
};

const Footer = ({ setTaskArray }) => {
  return (
    <footer className="w-2/3 flex justify-center">
      <button
        className="clearAll h-10 w-20 border-none px-2 py-0 bg-red-500 flex justify-center items-center"
        onClick={() => setTaskArray([])}
      >
        <span className="text-xs">Clear All</span>
      </button>
    </footer>
  );
};
