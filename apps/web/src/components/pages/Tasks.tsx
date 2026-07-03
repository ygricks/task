import type { ITask } from "@my-project/types"
import { useEffect, useState } from "react";
import { api } from "../../api";

export const Tasks = () => {
    const [data, setData] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async ()=>{
        let data = await api.get('/task');
        setData(data.data);
        setLoading(false);
    }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  return <p>{JSON.stringify(data)}</p>;
}
