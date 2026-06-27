import type { ITask } from "@my-project/types"
import { useEffect, useState } from "react";

export const Tasks = () => {
    const [data, setData] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async ()=>{
        let res = await fetch('/api/task');
        let data = await res.json();
        setData(data);
        setLoading(false);
    }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  return <p>{JSON.stringify(data)}</p>;
}
