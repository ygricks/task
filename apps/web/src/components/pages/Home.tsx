import { type ITask } from "@my-project/types"
import { useEffect, useState } from "react";
import './Home.css';

function TaskView({ task }: { task: ITask }) {
  return (
    <div key={task.id} className="taskView" >
      <div className="taskView_title">{task.name}</div>
      <div>{task.description}</div>
    </div>
  );
}

export const Home = () => {
    const [data, setData] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async ()=>{
        let res = await fetch('/api/task/last');
        let data = await res.json();
        setData(data);
        setLoading(false);
    }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div className="homePage">
    <p>The list of Tasks:</p>
    {/* <select>
      {Object.entries(TaskStatus)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => (
          <option key={value} value={value}>
            {key}
          </option>
        )
      )}
    </select> */}
    <div className="taskViewList">
      {data.map(item=>TaskView({task:item}))}
    </div>
  </div>
}
