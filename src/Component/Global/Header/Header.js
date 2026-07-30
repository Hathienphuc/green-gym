import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ModalForm from "../ModalForm/ModalForm";
import { useLogin } from "../../Context/Login/LoginContext";
import { useCart } from "../../Context/Cart/CartContext";
import Button from "../Button/Button";

const Header = () => {
    const location = useLocation();

    const [showAuth, setShowAuth] = useState(false);
    const { login, handleLogout } = useLogin();

    const { productCart } = useCart();

    const avatarUrl = login?.avatar ? `${login.avatar}?v=${Date.now()}` : `https://i.pravatar.cc/150?u=${login?.username}`;

    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    const [sidebar, setSidebar] = useState(false);
    const handleSidebar = (index) => {
        setSidebar(sidebar === index ? false : index);
    };

    const [toggle, setToggle] = useState(false);
    const sidebarRef = useRef();
    const iconRef = useRef();
    useEffect(() => {
        const handleSidebar = (e) => {
            if (iconRef.current && iconRef.current.contains(e.target)) {
                setToggle((toggle) => !toggle);
                return;
            }
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setToggle(false);
            }
        };
        document.addEventListener("click", handleSidebar);
        return () => {
            document.removeEventListener("click", handleSidebar);
        };
    }, []);

    return (
        <div className="header">
            <Container fluid>
                <Row className="header-content">
                    <Col xs={6} sm={6} md={5} lg={5} xl={4} xxl={4} className="col">
                        <div className="left">
                            <Link to="/">
                                <img src="/Image/Logo.png" alt="" />
                            </Link>
                            <div className="tool-search">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchInput}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSearchInput(value);
                                        if (value.trim() === "") {
                                            navigate("/shop");
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            navigate(`/shop?search=${encodeURIComponent(searchInput)}`);
                                        }
                                    }}
                                />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                    </Col>
                    <Col md={3} lg={3} xl={6} xxl={6} className="col-menu">
                        <ul className="menu">
                            <li>
                                <NavLink className={({ isActive }) => isActive && "active"} to="/">
                                    Trang chủ
                                </NavLink>
                            </li>
                            <li>
                                <p className={location.pathname.startsWith("/about/") && "active"}>
                                    Giới thiệu <i className="fa-solid fa-angle-down"></i>
                                </p>
                                <ul className="sub-menu">
                                    <li>
                                        <NavLink to="/about/greengym">Về Green Gym</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/about/coach">Huấn luyện viên</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/about/club">Câu lạc bộ</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p className={location.pathname.startsWith("/service/") && "active"}>
                                    Dịch vụ <i className="fa-solid fa-angle-down"></i>
                                </p>
                                <ul className="sub-menu">
                                    <li>
                                        <NavLink to="/service/course">Khóa tập</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/service/bmi">BMI</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive && "active"} to="/shop">
                                    Cửa hàng
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive && "active"} to="/blog">
                                    Tin tức
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive && "active"} to="/contact">
                                    Liên hệ
                                </NavLink>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={4} xl={2} xxl={2} className="col-tool">
                        {login?.username ? (
                            <div className="info-account">
                                <Link to="/cart" className="cart-header">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span>{productCart ? productCart.length : 0}</span>
                                </Link>
                                <Link to="/account" className="account-item">
                                    <img src={avatarUrl} alt="" loading="lazy" onError={(e) => (e.target.src = `https://i.pravatar.cc/150?u=${login.username}`)} />
                                    <span>{login.fullname}</span>
                                </Link>
                                <i className="fa-solid fa-bars" ref={iconRef}></i>
                            </div>
                        ) : (
                            <div className="info-register">
                                <Link to="/cart" className="cart-register">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span>{productCart ? productCart.length : 0}</span>
                                </Link>
                                <button onClick={() => setShowAuth(true)}>Tham gia ngay</button>
                                <ModalForm show={showAuth} handleClose={() => setShowAuth(false)} mode="login" />
                                <i className="fa-solid fa-bars" ref={iconRef}></i>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            <div className={`header-sidebar ${toggle && "active"}`} ref={sidebarRef}>
                <div className="logo-search">
                    <Link to="/">
                        <img src="/Image/Logo.png" alt="" />
                    </Link>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchInput}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchInput(value);
                                if (value.trim() === "") {
                                    navigate("/shop");
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    navigate(`/shop?search=${encodeURIComponent(searchInput)}`);
                                }
                            }}
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>

                <ul className="menu">
                    <li>
                        <NavLink className={({ isActive }) => isActive && "active"} to="/">
                            Trang chủ
                        </NavLink>
                    </li>
                    <li>
                        <p className={location.pathname.startsWith("/about") && "active"}>
                            Giới thiệu <i className={`fa-solid fa-angle-down ${sidebar === 1 && "active"}`} onClick={() => handleSidebar(1)}></i>
                        </p>
                        <ul className={`sub-menu ${sidebar === 1 && "active"}`}>
                            <li>
                                <NavLink to="/about/greengym">Về Green Gym</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about/coach">Huấn luyện viên</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about/club">Câu lạc bộ</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p className={location.pathname.startsWith("/service") && "active"}>
                            Dịch vụ <i className={`fa-solid fa-angle-down ${sidebar === 2 && "active"}`} onClick={() => handleSidebar(2)}></i>
                        </p>
                        <ul className={`sub-menu ${sidebar === 2 && "active"}`}>
                            <li>
                                <NavLink to="/service/course">Khóa tập</NavLink>
                            </li>
                            <li>
                                <NavLink to="/service/bmi">BMI</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive && "active"} to="/shop">
                            Cửa hàng
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive && "active"} to="/blog">
                            Tin tức
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive && "active"} to="/contact">
                            Liên hệ
                        </NavLink>
                    </li>
                </ul>

                <i className="fa-solid fa-xmark" onClick={() => setToggle(false)}></i>

                {login?.username ? (
                    <div className="info-account">
                        <Link to="/account" className="account-item">
                            <img src={avatarUrl} alt="" loading="lazy" onError={(e) => (e.target.src = `https://i.pravatar.cc/150?u=${login.username}`)} />
                            <span>{login.fullname}</span>
                        </Link>
                        <Button text="Đăng xuất" onClick={handleLogout}></Button>
                    </div>
                ) : (
                    <div className="info-register">
                        <Link to="/cart" className="cart-register">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>{productCart ? productCart.length : 0}</span>
                        </Link>
                        <button onClick={() => setShowAuth(true)}>Tham gia ngay</button>
                        <ModalForm show={showAuth} handleClose={() => setShowAuth(false)} mode="login" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
