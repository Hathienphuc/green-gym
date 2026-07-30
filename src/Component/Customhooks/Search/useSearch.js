import { useEffect, useState } from "react";

const useSearch = (data, keyword) => {
    const [result, setResult] = useState(data);
    useEffect(() => {
        const wordSearch = keyword.trim().toLowerCase();
        if (!wordSearch) {
            setResult(data);
        } else {
            setResult(data.filter((item) => (item.title || item.name || "").toLowerCase().includes(wordSearch)));
        }
    }, [data, keyword]);
    return result;
};

export default useSearch;
