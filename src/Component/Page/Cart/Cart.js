import React, { useEffect, useRef, useState } from "react";
import "./Cart.css";
import Heading from "../../Global/Heading/Heading";
import { Col, Container, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import { useCart } from "../../Context/Cart/CartContext";
import Button from "../../Global/Button/Button";
import * as Yup from "yup";
import useFetch from "../../Customhooks/Data/useFetch";
import { useLogin } from "../../Context/Login/LoginContext";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
    const { productCart, removeFromCart, selectedItems, toggleSelectItem, toggleSelectAll, removeSelectedItems, setProductCart, setSelectedItems, courseCart, setCourseCart } = useCart();
    const handleChangeCart = (id, type, cartType) => {
        if (cartType === "product") {
            const updatedCart = [...productCart];
            const findIndex = updatedCart.findIndex((item) => item.id === id);
            if (type === "plus") {
                updatedCart[findIndex].quantity++;
            } else if (type === "minus") {
                if (updatedCart[findIndex].quantity > 1) {
                    updatedCart[findIndex].quantity--;
                }
            } else if (type === "delete") {
                removeFromCart(id, "product");
                return;
            }
            setProductCart(updatedCart);
        } else if (cartType === "course") {
            if (type === "delete") {
                removeFromCart(id, "course");
            }
        }
    };

    const allItemIds = [...productCart.map((item) => `product-${item.id}`), ...courseCart.map((item) => `course-${item.id}`)];

    const selectedProductItems = productCart.filter((item) => selectedItems.includes(`product-${item.id}`));
    const selectedCourseItems = courseCart.filter((item) => selectedItems.includes(`course-${item.id}`));

    const tempPrice = selectedProductItems.reduce((total, item) => total + item.price * item.quantity, 0) + selectedCourseItems.reduce((total, item) => total + item.price, 0);

    const shippingCost = selectedProductItems.length > 0 ? 30000 : 0;
    const totalAmount = tempPrice + shippingCost;

    const isAllSelected = selectedItems.length === allItemIds.length && allItemIds.length > 0;

    const validationPay = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập họ tên"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Số điện thoại phải đủ 10 chữ số")
            .required("Vui lòng nhập số điện thoại"),
        email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
        city: Yup.object().nullable().required("Vui lòng chọn tỉnh/thành phố"),
        district: Yup.object().nullable().required("Vui lòng chọn quận/huyện"),
        ward: Yup.object().nullable().required("Vui lòng chọn phường/xã"),
        payment: Yup.string().required("Vui lòng chọn hình thức thanh toán"),
    });

    const { data: provinces } = useFetch("https://esgoo.net/api-tinhthanh/1/0.htm");
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const { data: district } = useFetch(selectedCity ? `https://esgoo.net/api-tinhthanh/2/${selectedCity.value}.htm` : null);
    const { data: ward } = useFetch(selectedDistrict ? `https://esgoo.net/api-tinhthanh/3/${selectedDistrict.value}.htm` : null);
    const cityOptions = provinces?.data?.map((city) => ({ value: city.id, label: city.name }));
    const districtOptions = district?.data?.map((d) => ({ value: d.id, label: d.name })) || [];
    const wardOptions = ward?.data?.map((w) => ({ value: w.id, label: w.name })) || [];

    const { login } = useLogin();
    const [userInfo, setUserInfo] = useState(null);

    const { data: user } = useFetch("https://68793e0c63f24f1fdca16f7c.mockapi.io/user");

    useEffect(() => {
        if (login?.id && user.length) {
            const userPay = user.find((item) => item.id === login.id);
            if (userPay) setUserInfo(userPay);
        }
    }, [login, user]);

    const formikRef = useRef();

    return (
        <div className="cart">
            <Container fluid>
                <Heading title="Giỏ hàng"></Heading>
                <Row className="cart-content">
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <div className="cash-left">
                            <h2>Thông tin vận chuyển</h2>
                            <Formik
                                innerRef={formikRef}
                                enableReinitialize
                                initialValues={{
                                    name: userInfo?.fullname || "",
                                    phone: userInfo?.phone || "",
                                    email: userInfo?.email || "",
                                    address: "",
                                    city: null,
                                    district: null,
                                    ward: null,
                                    payment: "cod",
                                }}
                                validationSchema={validationPay}
                                onSubmit={async (values, { resetForm }) => {
                                    try {
                                        const orderId = uuidv4();
                                        const orderDate = new Date().toLocaleString("vi-VN");

                                        const selectedProductItemsData = productCart.filter((item) => selectedItems.includes(`product-${item.id}`));
                                        const selectedCourseItemsData = courseCart.filter((item) => selectedItems.includes(`course-${item.id}`));

                                        const shippingCost = selectedProductItemsData.length > 0 ? 30000 : 0;
                                        const totalAmount =
                                            selectedProductItemsData.reduce((sum, i) => sum + i.price * i.quantity, 0) + selectedCourseItemsData.reduce((sum, i) => sum + i.price, 0) + shippingCost;

                                        const fullAddress = `${values.address}, ${values.ward?.label}, ${values.district?.label}, ${values.city?.label}`;

                                        const orderDataProduct = {
                                            id: orderId,
                                            customer: {
                                                name: values.name,
                                                phone: values.phone,
                                                email: values.email,
                                                address: fullAddress,
                                                payment: values.payment,
                                            },
                                            products: selectedProductItemsData,
                                            total: selectedProductItemsData.reduce((sum, i) => sum + i.price * i.quantity, 0) + shippingCost,
                                            createdAt: orderDate,
                                        };

                                        const responseProduct = await axios.post("https://68793e0c63f24f1fdca16f7c.mockapi.io/orderproduct", orderDataProduct);
                                        console.log("POST response:", responseProduct.data);

                                        let existingOrderProduct = [];

                                        try {
                                            const stored = JSON.parse(localStorage.getItem("ORDER_PRODUCT"));
                                            if (Array.isArray(stored)) {
                                                existingOrderProduct = stored;
                                            }
                                        } catch (e) {
                                            console.warn("ORDER_PRODUCT in localStorage is invalid JSON:", e);
                                        }

                                        existingOrderProduct.unshift(orderDataProduct);
                                        localStorage.setItem("ORDER_PRODUCT", JSON.stringify(existingOrderProduct));

                                        await Promise.all(
                                            selectedProductItemsData.map(async (item) => {
                                                const { data: product } = await axios.get(`https://6867db77d5933161d70a13d8.mockapi.io/product/${item.id}`);
                                                const newStock = Math.max((product.stock || 0) - item.quantity, 0);
                                                await axios.put(`https://6867db77d5933161d70a13d8.mockapi.io/product/${item.id}`, {
                                                    ...product, // giữ nguyên dữ liệu cũ
                                                    stock: newStock, // chỉ thay đổi stock
                                                });
                                            }),
                                        );

                                        const orderDataCourse = {
                                            id: orderId,
                                            customer: {
                                                name: values.name,
                                                phone: values.phone,
                                                email: values.email,
                                                address: fullAddress,
                                                payment: values.payment,
                                            },
                                            courses: selectedCourseItemsData,
                                            total: selectedCourseItemsData.reduce((sum, i) => sum + i.price, 0),
                                            createdAt: orderDate,
                                        };

                                        const responseCourse = await axios.post("https://68ac1dc97a0bbe92cbb94f6b.mockapi.io/ordercourse", orderDataCourse);
                                        console.log("POST response:", responseCourse.data);

                                        let existingOrderCourse = [];

                                        try {
                                            const stored = JSON.parse(localStorage.getItem("ORDER_COURSE"));
                                            if (Array.isArray(stored)) {
                                                existingOrderCourse = stored;
                                            }
                                        } catch (e) {
                                            console.warn("ORDER_COURSE in localStorage is invalid JSON:", e);
                                        }

                                        existingOrderCourse.unshift(orderDataCourse);
                                        localStorage.setItem("ORDER_COURSE", JSON.stringify(existingOrderCourse));

                                        await Promise.all(
                                            selectedCourseItemsData.map(async (item) => {
                                                const { data: course } = await axios.get(`https://6867db77d5933161d70a13d8.mockapi.io/course/${item.id}`);
                                                const newCapacity = Math.max((course.capacity || 0) - 1, 0);
                                                await axios.put(`https://6867db77d5933161d70a13d8.mockapi.io/course/${item.id}`, {
                                                    ...course,
                                                    capacity: newCapacity,
                                                });
                                            }),
                                        );

                                        const productsList = [
                                            ...selectedProductItemsData.map((item) => ({
                                                name: item.name,
                                                quantity: item.quantity,
                                                total_price: (item.price * item.quantity).toLocaleString() + "đ",
                                                image: item.img,
                                            })),
                                            ...selectedCourseItemsData.map((item) => ({
                                                name: item.title,
                                                total_price: item.price.toLocaleString() + "đ",
                                                image: item.img,
                                            })),
                                        ];

                                        try {
                                            emailjs.send(
                                                "service_7o0xpiy",
                                                "template_4ormopu",
                                                {
                                                    user_name: values.name,
                                                    user_email: values.email,
                                                    user_phone: values.phone,
                                                    user_address: fullAddress,
                                                    order_id: orderId,
                                                    order_date: orderDate,
                                                    payment_method: values.payment === "cod" ? "Thanh toán trực tiếp" : "Thanh toán trực tuyến",
                                                    total_price: totalAmount.toLocaleString() + "đ",
                                                    products: productsList,
                                                },
                                                "EdHFKpXclZeKFTqUJ",
                                            );
                                        } catch (emailError) {
                                            console.error("EmailJS Error:", emailError.text);
                                            toast.error("Gửi email thất bại!");
                                            return;
                                        }

                                        toast.success("Đặt hàng thành công!", {
                                            position: "top-center",
                                        });

                                        resetForm();

                                        setProductCart((prevCart) => prevCart.filter((item) => !selectedItems.includes(`product-${item.id}`)));
                                        setCourseCart((prevCart) => prevCart.filter((item) => !selectedItems.includes(`course-${item.id}`)));
                                        setSelectedItems([]);
                                    } catch (error) {
                                        console.error("Error submitting order:", error);
                                        toast.error("Đặt hàng thất bại!", { position: "top-center" });
                                    }
                                }}
                            >
                                {({ values, setFieldValue, setFieldTouched }) => (
                                    <Form>
                                        <div className="name">
                                            <label>Họ tên</label>
                                            <Field type="text" name="name" placeholder="Nhập họ tên" />
                                            <ErrorMessage name="name" component="div" className="error" />
                                        </div>
                                        <div className="phone">
                                            <label>Số điện thoại</label>
                                            <Field type="tel" inputMode="numeric" name="phone" placeholder="Nhập số điện thoại" />
                                            <ErrorMessage name="phone" component="div" className="error" />
                                        </div>
                                        <div className="email">
                                            <label>Email</label>
                                            <Field type="email" name="email" placeholder="Nhập email" disabled={!!userInfo} className={userInfo && "disabled-field"} />
                                            <ErrorMessage name="email" component="div" className="error" />
                                        </div>
                                        <div className="address">
                                            <label>Địa chỉ</label>
                                            <Field type="text" name="address" placeholder="Nhập địa chỉ" />
                                            <ErrorMessage name="address" component="div" className="error" />
                                        </div>
                                        <div className="country">
                                            <div className="city">
                                                <label>Tỉnh/thành phố</label>
                                                <Select
                                                    options={cityOptions}
                                                    placeholder="Chọn tỉnh/thành phố"
                                                    classNamePrefix="select-country"
                                                    value={values.city}
                                                    onChange={(val) => {
                                                        setFieldValue("city", val);
                                                        setFieldValue("district", null);
                                                        setFieldValue("ward", null);
                                                        setSelectedCity(val);
                                                        setSelectedDistrict(null);
                                                    }}
                                                    onBlur={() => setFieldTouched("city", true)}
                                                />
                                                <ErrorMessage name="city" component="div" className="error" />
                                            </div>

                                            <div className="district">
                                                <label>Quận/huyện</label>
                                                <Select
                                                    options={districtOptions}
                                                    placeholder="Chọn quận/huyện"
                                                    classNamePrefix="select-country"
                                                    value={values.district}
                                                    onChange={(val) => {
                                                        setFieldValue("district", val);
                                                        setFieldValue("ward", null);
                                                        setSelectedDistrict(val);
                                                    }}
                                                    isDisabled={!values.city}
                                                    onBlur={() => setFieldTouched("district", true)}
                                                />
                                                <ErrorMessage name="district" component="div" className="error" />
                                            </div>

                                            <div className="ward">
                                                <label>Phường/xã</label>
                                                <Select
                                                    options={wardOptions}
                                                    placeholder="Chọn phường/xã"
                                                    classNamePrefix="select-country"
                                                    onChange={(val) => setFieldValue("ward", val)}
                                                    isDisabled={!values.district}
                                                    onBlur={() => setFieldTouched("ward", true)}
                                                />
                                                <ErrorMessage name="ward" component="div" className="error" />
                                            </div>
                                        </div>

                                        <div className="method">
                                            <h2>Hình thức thanh toán</h2>
                                            <div className="payment">
                                                <div className="payment-content">
                                                    <Field type="radio" name="payment" value="cod" />
                                                    <div className="item">
                                                        <i className="fa-solid fa-truck"></i>
                                                        <p>Thanh toán trực tiếp</p>
                                                    </div>
                                                </div>
                                                <div className="payment-content">
                                                    <Field type="radio" name="payment" value="online" />
                                                    <div className="item">
                                                        <i className="fa-regular fa-credit-card"></i>
                                                        <p>Thanh toán trực tuyến</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <div className="cart-right">
                            <h2>Giỏ hàng</h2>
                            <div className="tool-cart">
                                <div className="tool-left">
                                    <input type="checkbox" name="" checked={isAllSelected} onChange={toggleSelectAll} />
                                    <p>Tất cả</p>
                                </div>
                                <p onClick={removeSelectedItems}>Xóa tất cả</p>
                            </div>

                            {productCart.length > 0 && (
                                <>
                                    <h3 className="product-cart-title">Sản phẩm</h3>
                                    {productCart.map((item) => (
                                        <div className="cart-detail" key={item.id}>
                                            <input type="checkbox" name="" checked={selectedItems.includes(`product-${item.id}`)} onChange={() => toggleSelectItem(item.id, "product")} />
                                            <div className="product-purchase">
                                                <img src={item.img} alt="" />
                                                <div className="purchase-info">
                                                    <h3>{item.name}</h3>
                                                    <p>
                                                        Số lượng: <span>{item.quantity}</span>
                                                    </p>
                                                    <div className="delete" onClick={() => handleChangeCart(item.id, "delete", "product")}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                        <p className="delete-text">Xóa</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="amount-cart">
                                                <i className="fa-solid fa-minus" onClick={() => handleChangeCart(item.id, "minus", "product")}></i>
                                                <span>{item.quantity}</span>
                                                <i className="fa-solid fa-plus" onClick={() => handleChangeCart(item.id, "plus", "product")}></i>
                                            </div>
                                            <p className="price-cart">{(item.price * item.quantity).toLocaleString()}đ</p>
                                        </div>
                                    ))}
                                </>
                            )}

                            {courseCart.length > 0 && (
                                <>
                                    <h3 className="product-cart-title">Khóa tập</h3>
                                    {courseCart.map((item) => (
                                        <div className="cart-detail" key={item.id}>
                                            <input type="checkbox" name="" checked={selectedItems.includes(`course-${item.id}`)} onChange={() => toggleSelectItem(item.id, "course")} />
                                            <div className="product-purchase">
                                                <img src={item.img} alt="" />
                                                <div className="purchase-info">
                                                    <h3>{item.title}</h3>
                                                    <p>
                                                        Câu lạc bộ: <span>{item.clubName}</span>
                                                    </p>
                                                    <div className="delete" onClick={() => handleChangeCart(item.id, "delete", "course")}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                        <p className="delete-text">Xóa</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="price-cart">{item.price.toLocaleString()}đ</p>
                                        </div>
                                    ))}
                                </>
                            )}

                            <h3>Chi tiết thanh toán</h3>
                            <div className="payment-detail">
                                <div className="payment-item">
                                    <p>Tạm tính</p>
                                    <span>{tempPrice.toLocaleString()}đ</span>
                                </div>
                                <div className="payment-item">
                                    <p>Phí giao hàng</p>
                                    <span>{shippingCost.toLocaleString()}đ</span>
                                </div>
                            </div>
                            <div className="sum-price">
                                <p>Tổng cộng</p>
                                <span>{totalAmount.toLocaleString()}đ</span>
                            </div>
                            <Button
                                text="Mua hàng"
                                onClick={() => {
                                    // Không có sản phẩm nào trong giỏ
                                    if (productCart.length === 0 && courseCart.length === 0) {
                                        toast.error("Giỏ hàng đang trống!", {
                                            position: "top-center",
                                        });
                                        return;
                                    }

                                    // Có giỏ hàng nhưng chưa chọn sản phẩm
                                    if (selectedItems.length === 0) {
                                        toast.error("Vui lòng chọn một sản phẩm để đặt hàng!", {
                                            position: "top-center",
                                        });
                                        return;
                                    }
                                    formikRef.current?.submitForm();
                                }}
                            ></Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Cart;
