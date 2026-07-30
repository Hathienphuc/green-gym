import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        };
        fetchApi();
    }, [url]);
    return { data };
};

export default useFetch;
