import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [productCart, setProductCart] = useState(localStorage.getItem("PRODUCT_CART") ? JSON.parse(localStorage.getItem("PRODUCT_CART")) : []);
    const [courseCart, setCourseCart] = useState(localStorage.getItem("COURSE_CART") ? JSON.parse(localStorage.getItem("COURSE_CART")) : []);
    const [selectedItems, setSelectedItems] = useState([]);
    const getKey = (id, type) => `${type}-${id}`;

    const addToCart = (item, type) => {
        if (type === "product") {
            const newCart = [...productCart];
            const findIndex = newCart.findIndex((product) => product.id === item.id);
            if (findIndex < 0) {
                item.quantity = 1;
                newCart.unshift({ ...item });
            } else {
                newCart[findIndex].quantity += item.quantity;
            }
            setProductCart(newCart);
            const keyProduct = getKey(item.id, "product");
            setSelectedItems((prev) => (prev.includes(keyProduct) ? prev : [...prev, keyProduct]));
            return true;
        } else if (type === "course") {
            const existCourse = courseCart.some((course) => course.id === item.id);
            if (existCourse) return false;
            setCourseCart((prev) => [item, ...prev]);
            const keyCourse = getKey(item.id, "course");
            setSelectedItems((prev) => (prev.includes(keyCourse) ? prev : [...prev, keyCourse]));
            return true;
        }
    };

    const removeFromCart = (id, type) => {
        const key = getKey(id, type);
        if (type === "product") {
            setProductCart((prev) => prev.filter((item) => item.id !== id));
            // setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
        } else if (type === "course") {
            setCourseCart((prev) => prev.filter((item) => item.id !== id));
        }
        setSelectedItems((prev) => prev.filter((itemId) => itemId !== key));
    };

    const removeSelectedItems = () => {
        setProductCart([]);
        setCourseCart([]);
    };

    const toggleSelectItem = (id, type) => {
        const key = getKey(id, type);
        setSelectedItems((prev) => (prev.includes(key) ? prev.filter((itemId) => itemId !== key) : [...prev, key]));
    };

    const toggleSelectAll = () => {
        const allIds = [...productCart.map((item) => getKey(item.id, "product")), ...courseCart.map((item) => getKey(item.id, "course"))];
        if (selectedItems.length === allIds.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(allIds);
        }
    };

    useEffect(() => {
        localStorage.setItem("PRODUCT_CART", JSON.stringify(productCart));
        localStorage.setItem("COURSE_CART", JSON.stringify(courseCart));
    }, [productCart, courseCart]);

    const value = {
        productCart,
        addToCart,
        removeFromCart,
        selectedItems,
        toggleSelectItem,
        toggleSelectAll,
        removeSelectedItems,
        setProductCart,
        courseCart,
        setSelectedItems,
        setCourseCart,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => {
    const context = useContext(CartContext);
    return context;
};

export { CartProvider, useCart };
