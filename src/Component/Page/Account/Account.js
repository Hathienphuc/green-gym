import React, { useEffect, useState } from "react";
import "./Account.css";
import { Col, Container, Modal, Row } from "react-bootstrap";
import Heading from "../../Global/Heading/Heading";
import Button from "../../Global/Button/Button";
import { useLogin } from "../../Context/Login/LoginContext";
import ModalForm from "../../Global/ModalForm/ModalForm";
import useFetch from "../../Customhooks/Data/useFetch";
import { toast } from "react-toastify";
import { useCart } from "../../Context/Cart/CartContext";
import { v4 as uuid } from "uuid";

const Account = () => {
    const { login, handleLogout, handleLogin } = useLogin();

    const showInfo = (value) => (value && value.trim() !== "" ? value : "Chưa cập nhật");

    const [showUpdate, setShowUpdate] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const CLOUD_NAME = "dsvfnaz0t";
    const UPLOAD_PRESET = "green_gym";
    const accountAPI = "https://68793e0c63f24f1fdca16f7c.mockapi.io/user";

    const handleClickUpload = async () => {
        try {
            const [fileHandle] = await window.showOpenFilePicker({ multiple: false });
            const file = await fileHandle.getFile();
            if (!file) return;
            const tempUrl = URL.createObjectURL(file);
            setAvatarPreview(tempUrl);
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!data.secure_url) throw new Error("Upload thất bại");
            const imageUrl = `${data.secure_url}?v=${Date.now()}`;
            const updatedUser = { ...login, avatar: imageUrl };

            await fetch(`${accountAPI}/${login.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });
            handleLogin(updatedUser);
            setAvatarPreview(null);
        } catch (err) {
            console.error("Lỗi upload:", err);
            setAvatarPreview(null);
        } finally {
            setIsUploading(false);
        }
    };

    const [activeTab, setActiveTab] = useState("info");
    const [showChange, setShowChange] = useState(false);
    const [activeTabHistory, setActiveTabHistory] = useState("course");

    const { data: arrOrderProduct } = useFetch(`https://68793e0c63f24f1fdca16f7c.mockapi.io/orderproduct`);
    const { data: arrOrderCourse } = useFetch(`https://68ac1dc97a0bbe92cbb94f6b.mockapi.io/ordercourse`);

    const [showOrderDetail, setShowOrderDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderType, setOrderType] = useState("course");

    const handleViewDetail = (item, type) => {
        setSelectedOrder(item);
        setOrderType(type);
        setShowOrderDetail(true);
    };

    const [localOrderProduct, setLocalOrderProduct] = useState([]);
    const [localOrderCourse, setLocalOrderCourse] = useState([]);

    useEffect(() => {
        if (arrOrderProduct) setLocalOrderProduct(arrOrderProduct);
        if (arrOrderCourse) setLocalOrderCourse(arrOrderCourse);
    }, [arrOrderProduct, arrOrderCourse]);

    const handleCancelOrder = async () => {
        if (!selectedOrder) return;
        try {
            if (orderType === "product") {
                const foundOrder = localOrderProduct.find((order) => order.products.some((p) => p.cartProductId === selectedOrder.id));
                const productItem = foundOrder.products.find((p) => p.cartProductId === selectedOrder.id);
                const productId = productItem.id;
                const res = await fetch(`https://6867db77d5933161d70a13d8.mockapi.io/product/${productId}`);
                const productData = await res.json();
                const updatedStock = (productData.stock || 0) + productItem.quantity;

                await fetch(`https://6867db77d5933161d70a13d8.mockapi.io/product/${productId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ stock: updatedStock }),
                });

                const updatedOrders = localOrderProduct.map((order) => {
                    if (order.id === foundOrder.id) {
                        return {
                            ...order,
                            products: order.products.map((p) =>
                                p.cartProductId === selectedOrder.id
                                    ? {
                                          ...p,
                                          status: "Đã hủy",
                                      }
                                    : p,
                            ),
                        };
                    }
                    return order;
                });

                for (const order of updatedOrders) {
                    await fetch(`https://68793e0c63f24f1fdca16f7c.mockapi.io/orderproduct/${order.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(order),
                    });
                }
                setLocalOrderProduct(updatedOrders);
                localStorage.setItem("ORDER_PRODUCT", JSON.stringify(updatedOrders));
                const filtered = updatedOrders.filter((o) => o.products.length > 0);
                setLocalOrderProduct(filtered);
                localStorage.setItem("ORDER_PRODUCT", JSON.stringify(filtered));
                toast.success("Hủy đơn hàng thành công!");
            } else if (orderType === "course") {
                const foundOrder = localOrderCourse.find((order) => order.courses.some((c) => c.cartCourseId === selectedOrder.id));
                const courseItem = foundOrder.courses.find((c) => c.cartCourseId === selectedOrder.id);
                const courseId = courseItem.id;
                const courseRes = await fetch(`https://6867db77d5933161d70a13d8.mockapi.io/course/${courseId}`);
                const courseData = await courseRes.json();
                const updatedCapacity = (courseData.capacity || 0) + 1;

                await fetch(`https://6867db77d5933161d70a13d8.mockapi.io/course/${courseId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ capacity: updatedCapacity }),
                });

                const updatedOrders = localOrderCourse.map((order) => {
                    if (order.id === foundOrder.id) {
                        return {
                            ...order,
                            courses: order.courses.map((c) =>
                                c.cartCourseId === selectedOrder.id
                                    ? {
                                          ...c,
                                          status: "Đã hủy",
                                      }
                                    : c,
                            ),
                        };
                    }
                    return order;
                });

                for (const order of updatedOrders) {
                    await fetch(`https://68ac1dc97a0bbe92cbb94f6b.mockapi.io/ordercourse/${order.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(order),
                    });
                }
                setLocalOrderCourse(updatedOrders);
                localStorage.setItem("ORDER_COURSE", JSON.stringify(updatedOrders));
                const filtered = updatedOrders.filter((o) => o.courses.length > 0);
                setLocalOrderCourse(filtered);
                localStorage.setItem("ORDER_COURSE", JSON.stringify(filtered));
                toast.success("Hủy đăng ký thành công!");
            }
            setShowOrderDetail(false);
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    const { addToCart } = useCart();
    const handleReOrder = (item, type) => {
        if (type === "product") {
            const product = {
                cartProductId: uuid(),
                id: item.productId,
                name: item.name,
                price: item.price,
                img: item.img,
                quantity: item.quantity,
            };
            addToCart(product, "product");
            toast.success(
                <div className="custom-toast">
                    <div className="toast-header">Thêm vào giỏ hàng thành công</div>
                    <div className="toast-body">
                        <img src={item.img} alt="" />
                        <div className="product-info">
                            <p className="product-name">{item.name}</p>
                            <p className="product-price">{item.price.toLocaleString()}đ</p>
                        </div>
                    </div>
                </div>,
            );
        }

        if (type === "course") {
            const course = {
                cartCourseId: uuid(),
                id: item.courseId,
                title: item.title,
                price: item.price,
                clubName: item.clubName,
                img: item.img,
            };
            const added = addToCart(course, "course");
            if (added) {
                toast.success("Đã thêm khóa học!", {
                    position: "top-center",
                });
            } else {
                toast.error("Khóa học này đã có trong giỏ hàng!", {
                    position: "top-center",
                });
            }
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "info":
                return (
                    <div className="right-info-account">
                        <h2>Thông tin tài khoản</h2>
                        <div className="account-page">
                            <div className="left-account">
                                <p>
                                    <span>Họ tên:</span>
                                    <span>{showInfo(login?.fullname)}</span>
                                </p>
                                <p>
                                    <span>Số điện thoại:</span>
                                    <span>{showInfo(login?.phone)}</span>
                                </p>
                                <p>
                                    <span>Email:</span>
                                    <span>{showInfo(login?.email)}</span>
                                </p>
                                <p>
                                    <span>Giới tính:</span>
                                    <span>{showInfo(login?.gender)}</span>
                                </p>
                            </div>
                            <div className="right-account">
                                <img src={avatarPreview ? avatarPreview : login?.avatar ? login.avatar : `https://i.pravatar.cc/150?u=${login?.username}`} alt="" />
                                <Button text={isUploading ? "Đang tải..." : "Upload"} onClick={handleClickUpload} disabled={isUploading} />
                            </div>
                        </div>
                        <Button text="Cập nhật" onClick={() => setShowUpdate(true)} />
                        <ModalForm show={showUpdate} handleClose={() => setShowUpdate(false)} mode="update" userData={login} />
                    </div>
                );

            case "password":
                return (
                    <div className="right-info-pass">
                        <h2>Đổi mật khẩu</h2>
                        <div className="tab-pass">
                            <p>
                                <span>Tên đăng nhập:</span>
                                <span>{showInfo(login.username)}</span>
                            </p>
                            <p>
                                <span>Mật khẩu:</span>
                                <span>********</span>
                            </p>
                        </div>
                        <Button text="Cập nhật" onClick={() => setShowChange(true)} />
                        <ModalForm show={showChange} handleClose={() => setShowChange(false)} mode="changePassword" userData={login} />
                    </div>
                );

            case "orders":
                return (
                    <div className="right-info-account">
                        <h2>Lịch sử đơn hàng</h2>
                        <ul className="history-tab">
                            <li className={activeTabHistory === "course" && "active"} onClick={() => setActiveTabHistory("course")}>
                                Khóa tập
                            </li>
                            <li className={activeTabHistory === "product" && "active"} onClick={() => setActiveTabHistory("product")}>
                                Sản phẩm
                            </li>
                        </ul>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>{activeTabHistory === "course" ? "Tên khóa học" : "Tên sản phẩm"}</th>
                                    {activeTabHistory === "product" && <th>Số lượng</th>}
                                    <th>Giá tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(activeTabHistory === "course"
                                    ? localOrderCourse.flatMap((order) =>
                                          order.courses.map((c) => ({
                                              id: c.cartCourseId,
                                              courseId: c.id,
                                              img: c.img,
                                              title: c.title,
                                              price: c.price,
                                              clubName: c.clubName,
                                              status: c.status || "Thành công",
                                              customerName: order.customer.name,
                                              phone: order.customer.phone,
                                              address: order.customer.address,
                                              payment: order.customer.payment,
                                              createdAt: order.createdAt,
                                          })),
                                      )
                                    : localOrderProduct.flatMap((order) =>
                                          order.products.map((p) => ({
                                              id: p.cartProductId,
                                              productId: p.id,
                                              img: p.img,
                                              name: p.name,
                                              quantity: p.quantity,
                                              price: p.price,
                                              total: p.price * p.quantity,
                                              status: p.status || "Thành công",
                                              customerName: order.customer.name,
                                              phone: order.customer.phone,
                                              address: order.customer.address,
                                              payment: order.customer.payment,
                                              createdAt: order.createdAt,
                                          })),
                                      )
                                ).map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td className="name-cell">
                                            <img src={item.img} alt="" />
                                            <span>{item.title || item.name}</span>
                                        </td>
                                        {activeTabHistory === "product" && <td>{item.quantity}</td>}
                                        <td>{(activeTabHistory === "product" ? item.total : item.price).toLocaleString()}đ</td>
                                        <td>
                                            <span className={item.status === "Đã hủy" ? "status-cancel" : "status-success"}>{item.status}</span>
                                        </td>
                                        <td>
                                            <Button text="Xem chi tiết" onClick={() => handleViewDetail(item, activeTabHistory)}></Button>
                                            {activeTabHistory === "product" ? (
                                                <Button onClick={() => handleReOrder(item, "product")} text="Mua lại"></Button>
                                            ) : (
                                                <Button onClick={() => handleReOrder(item, "course")} text="Đăng ký lại"></Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="account">
            <Container fluid>
                <Heading title="Tài khoản"></Heading>
                <Row className="account-wrapper">
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <ul>
                            <li className={activeTab === "info" && "active"} onClick={() => setActiveTab("info")}>
                                Thông tin tài khoản <i className="fa-solid fa-arrow-right"></i>
                            </li>
                            <li className={activeTab === "password" && "active"} onClick={() => setActiveTab("password")}>
                                Đổi mật khẩu <i className="fa-solid fa-arrow-right"></i>
                            </li>
                            <li className={activeTab === "orders" && "active"} onClick={() => setActiveTab("orders")}>
                                Lịch sử đơn hàng <i className="fa-solid fa-arrow-right"></i>
                            </li>
                            <li onClick={handleLogout}>
                                Đăng xuất <i className="fa-solid fa-arrow-right"></i>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                        {renderContent()}
                    </Col>
                </Row>

                <Modal show={showOrderDetail} onHide={() => setShowOrderDetail(false)} centered size="lg" dialogClassName="account-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>{activeTabHistory === "course" ? "Thông tin đăng ký" : "Thông tin đơn hàng"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedOrder && (
                            <div className="order-detail">
                                <h3>{activeTabHistory === "course" ? "Thông tin đăng ký khóa tập" : "Thông tin vận chuyển"}</h3>

                                {orderType === "course" ? (
                                    <div className="order-detail-item">
                                        <p>
                                            Mã đơn hàng: <span>{selectedOrder.id}</span>
                                        </p>
                                        <p>
                                            <i className="fa-regular fa-credit-card"></i>Phương thức thanh toán:
                                            <span>{selectedOrder.payment}</span>
                                        </p>
                                        <p>
                                            <i className="fa-regular fa-clock"></i>
                                            <span>{selectedOrder.createdAt}</span>
                                        </p>
                                        <h3 className="title-express">Thông tin khách hàng đăng ký tập</h3>
                                        <div className="info-express">
                                            <i className="fa-regular fa-user"></i>
                                            <ul>
                                                <li>
                                                    Họ tên: <span>{selectedOrder.customerName}</span>
                                                </li>
                                                <li>
                                                    Số điện thoại: <span>{selectedOrder.phone}</span>
                                                </li>
                                                <li>
                                                    Địa chỉ: <span>{selectedOrder.address}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="history-order">
                                            <img src={selectedOrder.img} alt="" />
                                            <div className="right-order">
                                                <p>{selectedOrder.title}</p>
                                                <p className="order-quantity">Câu lạc bộ: {selectedOrder.clubName}</p>
                                                <p>
                                                    Thành tiền: <span>{selectedOrder.price.toLocaleString()}đ</span>
                                                </p>
                                            </div>
                                        </div>
                                        {selectedOrder.status === "Đã hủy" ? <p className="noti-cancel">Đã hủy</p> : <Button text="Hủy đăng ký" onClick={handleCancelOrder}></Button>}
                                    </div>
                                ) : (
                                    <div className="order-detail-item">
                                        <p>
                                            Mã đơn hàng: <span>{selectedOrder.id}</span>
                                        </p>
                                        <p>
                                            <i className="fa-regular fa-credit-card"></i>Phương thức thanh toán:
                                            <span>{selectedOrder.payment}</span>
                                        </p>
                                        <p>
                                            <i className="fa-regular fa-clock"></i>
                                            <span>{selectedOrder.createdAt}</span>
                                        </p>
                                        <h3 className="title-express">Thông tin nhận hàng</h3>
                                        <div className="info-express">
                                            <i className="fa-regular fa-user"></i>
                                            <ul>
                                                <li>
                                                    Họ tên: <span>{selectedOrder.customerName}</span>
                                                </li>
                                                <li>
                                                    Số điện thoại: <span>{selectedOrder.phone}</span>
                                                </li>
                                                <li>
                                                    Địa chỉ: <span>{selectedOrder.address}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="history-order">
                                            <img src={selectedOrder.img} alt="" />
                                            <div className="right-order">
                                                <p>{selectedOrder.name}</p>
                                                <p className="order-quantity">Số lượng: {selectedOrder.quantity}</p>
                                                <p>
                                                    Thành tiền: <span>{selectedOrder.price.toLocaleString()}đ</span>
                                                </p>
                                            </div>
                                        </div>
                                        {selectedOrder.status === "Đã hủy" ? <p className="noti-cancel">Đã hủy</p> : <Button text="Hủy đơn" onClick={handleCancelOrder}></Button>}
                                    </div>
                                )}
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default Account;
