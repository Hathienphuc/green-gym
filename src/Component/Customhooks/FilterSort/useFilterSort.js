import { useEffect, useState } from "react";

const useFilterSort = (arrFilter, setCategory, setCurrentPage) => {
    const [filterState, setFilterState] = useState({});
    const [priceRangeState, setPriceRangeState] = useState(null);
    const [sort, setSort] = useState("");

    const shop = (key, filterValue) => {
        setFilterState((item) => {
            const updated = { ...item };
            if (!filterValue || filterValue === "All") {
                delete updated[key];
            } else {
                updated[key] = filterValue;
            }
            return updated;
        });
    };

    const filterByPrice = (range) => {
        setPriceRangeState(range);
    };

    const handleSort = (value) => {
        setSort(value);
    };

    useEffect(() => {
        let filtered = [...arrFilter];

        const filterHandlers = {
            capacity: (items, value) => {
                if (value === "Đủ số lượng") return items.filter((item) => item.capacity === 0);
                if (value === "Chưa đủ số lượng") return items.filter((item) => item.capacity > 0);
                return items;
            },
            stock: (items, value) => {
                if (value === "Còn hàng") return items.filter((item) => item.stock > 0);
                if (value === "Hết hàng") return items.filter((item) => item.stock === 0);
                return items;
            },
        };

        Object.entries(filterState).forEach(([key, filterValue]) => {
            if (!filterValue || filterValue === "All") return;
            if (filterHandlers[key]) {
                filtered = filterHandlers[key](filtered, filterValue);
            } else {
                filtered = filtered.filter((item) => item[key]?.toString().toLowerCase() === filterValue.toString().toLowerCase());
            }
        });

        if (priceRangeState) {
            filtered = filtered.filter((item) => item.price >= priceRangeState[0] && item.price <= priceRangeState[1]);
        }

        if (sort) {
            const [key, order] = sort.split("-");
            filtered.sort((a, b) => {
                if (a[key] < b[key]) return order === "asc" ? -1 : 1;
                if (a[key] > b[key]) return order === "asc" ? 1 : -1;
                return 0;
            });
        }
        setCategory(filtered);
        setCurrentPage(0);
    }, [arrFilter, filterState, setCategory, setCurrentPage, priceRangeState, sort]);
    return { shop, filterByPrice, handleSort };
};

export default useFilterSort;
