import { useEffect, useState } from "react";

const useFetch = <T>(fetchFn: () => Promise<T> , autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {

        try{
            setLoading(true);
            setError(null);
            const result = await fetchFn();
            setData(result);
        }catch(error){
            console.error("Error fetching data:", error);
            setError("Failed to fetch data");
        }finally{
            setLoading(false);
        }
    }

    const resetData = () => {
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    }, []);

    return {data, error, loading, refetch:fetchData, resetData}

}
export default useFetch;