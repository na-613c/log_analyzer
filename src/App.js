import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("new_log", function (msg) {
      setData(prev => [...prev, msg]);
      console.log(msg);
    });

    return () => socket.close();
  }, []);

  return (
    <div className="App">
      <ul>
        {data.map(v => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
