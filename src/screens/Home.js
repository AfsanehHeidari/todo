import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Row from "../components/Row";
import { useUser } from "../context/useUser";
import Authentication from "./Authentication";

const url = "http://localhost:3001";

function Home() {
  const { user } = useUser();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error ? error.response.data.error : error);
      });
  }, []);

  const addTask = () => {
    const headers = { headers: { Authorization: user.token } };

    axios
      .post(url + "/create", {
        description: task,
      })
      .then((response) => {
        setTasks([...tasks, { id: response.data.id, description: task }]);
        setTask("");
      })
      .catch((error) => {
        alert(error.response.data.error ? error.response.data.error : error);
      });
  };

  const deleteTask = (id) => {
    const headers = { headers: { Authorization: user.token } };

    axios
      .delete(url + "/delete/" + id)
      .then((response) => {
        const withoutRemoved = tasks.filter((item) => item.id !== id);
        setTasks(withoutRemoved);
      })
      .catch((error) => {
        alert(error.response.data.error ? error.response.data.error : error);
      });
  };

  return (
    <div id="container">
      <h3>Todos</h3>
      <form>
        <input
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTask();
            }
          }}
        />
      </form>
      <ul>
        {tasks.map((item) => (
          // <li key={item.id}>{item.description}
          // <button className='delete-button' onClick={()=> deleteTask(item.id)}>Delete</button>
          // </li>
          <Row key={item.id} item={item} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

export default Home;



// import { useEffect, useState } from "react";
// import "../App.css";
// import axios from "axios";
// import Row from "../components/Row";
// import { useUser } from "../context/useUser";
// function Home() {
//   const { user } = useUser();
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const url = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     axios
//       .get(url)
//       .then((response) => {
//         console.log("Response:", response);
//         setTasks(response.data);
//       })
//       .catch((error) => {
//         alert(error.response.data.error ? error.response.data.error : error);
//       });
//   }, [url]);

//   const addTask = () => {
//     const headers = { headers: { Authorization: user.token } };
//     axios
//       .post(
//         url + "/create",
//         {
//           description: task,
//         },
//         headers
//       )
//       .then((response) => {
//         setTasks([...tasks, { id: response.data.id, description: task }]);
//         setTask("");
//       })
//       .catch((error) => {
//         console.log(error);
//         alert(error.response.data.error ? error.response.data.error : error);
//       });
//   };

//   const deleteTask = (id) => {
//     const headers = { headers: { Authorization: user.token } };
//     axios
//       .delete(url + "/delete/" + id, headers)
//       .then((response) => {
//         const withoutRemoved = tasks.filter((item) => item.id !== id);
//         setTasks(withoutRemoved);
//       })
//       .catch((error) => {
//         alert(error.response.data.error ? error.response.data.error : error);
//       });
//   };
//   return (
//     <div id="container">
//       <h3>Todos</h3>
//       <form>
//         <input
//           placeholder="Add new task"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               addTask();
//             }
//           }}
//         ></input>
//       </form>
//       <ul>
//         {tasks.map((item) => (
//           <Row item={item} deleteTask={deleteTask}></Row>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;
