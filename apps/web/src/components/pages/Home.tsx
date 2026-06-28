import { TaskStatus, type ITask } from "@my-project/types"
import { useEffect, useState } from "react";
import './Home.css';

function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const taskStatusOptions = Object.entries(TaskStatus)
.filter(([key]) => isNaN(Number(key)))
.map(([key, value]) => ({
  label: capitalize(key.replace('_', ' ')),
  value: value
}));

function TaskView({ task }: { task: ITask }) {
  return (
    <div key={task.id} className="taskView" >
      <div className="taskView_title">
        <div className="taskView_title_left">
          {task.name}
        </div>
        <div className="taskView_title_right">
          <p>{capitalize(TaskStatus[task.status])}</p>
        </div>
      </div>
      <div className="taskView_description">{task.description}</div>
    </div>
  );
}

export const Home = () => {
  const [data, setData] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageOption, setPageOption] = useState(0);

  // Event handler to capture the selection change
  const handleChange = (event: {target:{value:string}}) => {
    setPageOption(parseInt(event.target.value, 10));
    // @TODO update list by selected status
  };

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
    <select name="taskStatus" value={pageOption} onChange={handleChange}>
      {taskStatusOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="taskViewList">
      {data.map(item=>TaskView({task:item}))}
    </div>
  </div>
}
