import { TaskStatus, type ITask } from "@my-project/types"
import { useEffect, useState } from "react";
import { api } from "../../api";
import { type AxiosRequestConfig } from 'axios';

import './Home.css';

function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const StatusValueAll = 111;
const taskStatusOptions = (()=>{
  const list = Object.entries(TaskStatus)
  .filter(([key]) => isNaN(Number(key)))
  .map(([key, value]) => ({
    label: capitalize(key.replace('_', ' ')),
    value: value
  }));
  list.unshift({
    label: 'All',
    value: StatusValueAll.toString()
  })
  return list;
})();

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
  const [pageOption, setPageOption] = useState(TaskStatus.PENDING);

  const handleStatusChange = (event: {target: {value: string}}) => {
    const status = parseInt(event.target.value, 10);
    setPageOption(status);
    setLoading(true);
    loadTasks(status);
  };

  const loadTasks = async (statusOption:number|undefined=undefined)=>{
    const status: AxiosRequestConfig | undefined = statusOption===StatusValueAll ? undefined : {params:{s:statusOption}};
    const response = await api.get('/task/last', status);
    setData(response.data as ITask[]);
    setLoading(false);
  }

  useEffect(() => {
    loadTasks(pageOption);
  }, []);

  if (loading) return <p>Loading...</p>;
  return <div className="homePage">
    <p>The list of Tasks:</p>
    <select name="taskStatus" value={pageOption} onChange={handleStatusChange}>
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
