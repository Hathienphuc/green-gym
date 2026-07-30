import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(() => (localStorage.getItem("LOGIN_INFO") ? JSON.parse(localStorage.getItem("LOGIN_INFO")) : null));

    const handleLogin = (user) => {
        setLogin(user);
        localStorage.setItem("LOGIN_INFO", JSON.stringify(user));
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        setLogin(null);
        localStorage.removeItem("LOGIN_INFO");
        toast.success("Đăng xuất thành công!", { position: "top-center" });
        navigate("/");
    };
    return <LoginContext.Provider value={{ login, handleLogin, handleLogout }}>{children}</LoginContext.Provider>;
};

const useLogin = () => useContext(LoginContext);

export { LoginProvider, useLogin };
