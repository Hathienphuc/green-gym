import React, { useState, useEffect } from "react";
import "./ProdductDetail.css";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "../../Global/Heading/Heading";
import Button from "../../Global/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../Customhooks/Data/useFetch";
import CardProduct from "../../Global/CardProduct/CardProduct";
import { useCart } from "../../Context/Cart/CartContext";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

const ProductDetail = () => {
    const { slug } = useParams();
    const { data: productDetail } = useFetch(`https://6867db77d5933161d70a13d8.mockapi.io/product/${slug}`);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    useEffect(() => {
        if (thumbsSwiper && !thumbsSwiper.destroyed) {
            setThumbsSwiper(thumbsSwiper);
        }
    }, [thumbsSwiper]);

    const [desc, setDesc] = useState(false);
    const handleDesc = () => {
        setDesc(!desc);
    };

    const { data: arrProduct } = useFetch(`https://6867db77d5933161d70a13d8.mockapi.io/product`);
    const relatedProduct = arrProduct.filter((item) => item.category === productDetail.category && item.id !== productDetail.id);
    const selected = relatedProduct.slice(0, 4);

    const [amount, setAmount] = useState(1);
    const handleChangeAmount = (type) => {
        setAmount(type === "add" ? amount + 1 : type === "sub" ? (amount > 1 ? amount - 1 : 1) : amount);
    };

    const { addToCart } = useCart();
    const handleAddCart = () => {
        toast.success(
            <div className="custom-toast">
                <div className="toast-header">Thêm vào giỏ hàng thành công</div>
                <div className="toast-body">
                    <img src={productDetail.img[0]} alt="" />
                    <div className="product-info">
                        <p className="product-name">{productDetail.name}</p>
                        <p className="product-price">{productDetail.price.toLocaleString()}đ</p>
                    </div>
                </div>
            </div>,
            {
                autoClose: 2000,
            },
        );
        const product = {
            ...productDetail,
            img: productDetail.img[0],
            quantity: amount,
        };
        addToCart(product, "product");
    };

    const navigate = useNavigate();
    const newId = uuid();

    return (
        <div className="product-detail">
            <Container fluid>
                <Heading title={productDetail.name} breadcrumbs={[{ path: "/ Cửa hàng", link: "/shop" }]}></Heading>
                <Row className="detail-content">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <div className="detail-item">
                            <div className="thumb-img">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    direction="vertical"
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="thumb mySwiper"
                                >
                                    {productDetail?.img?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={item} alt="" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="main-img">
                                <Swiper spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]} className="main-swiper mySwiper2">
                                    {productDetail?.img?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={item} alt="" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <div className="detail-info">
                            <h2>{productDetail.name}</h2>
                            <div className="stars">
                                {Array.from({ length: productDetail.rating }).map((_, index) => (
                                    <i key={index} className="fa-solid fa-star"></i>
                                ))}
                            </div>
                            <p className="price-detail">{productDetail?.price?.toLocaleString()}đ</p>
                            <p className="short-desc">{productDetail.shortDesc}</p>
                            <div className="quantity">
                                <p>Quantity</p>
                                <div className="amount">
                                    <i className="fa-solid fa-minus" onClick={() => handleChangeAmount("sub")}></i>
                                    <span>{amount}</span>
                                    <i className="fa-solid fa-plus" onClick={() => handleChangeAmount("add")}></i>
                                </div>
                            </div>
                            <div className="btn-detail">
                                {productDetail.stock > 0 ? (
                                    <>
                                        <Button
                                            text="Mua hàng"
                                            onClick={() => {
                                                const product = {
                                                    cartProductId: newId,
                                                    id: productDetail.id,
                                                    img: productDetail.img[0],
                                                    quantity: amount,
                                                };
                                                addToCart(product, "product");
                                                navigate("/cart");
                                            }}
                                        ></Button>
                                        <Button text="Thêm vào giỏ" onClick={handleAddCart}></Button>
                                    </>
                                ) : (
                                    <p className="out-of-stock">Hết hàng</p>
                                )}
                            </div>
                            <p className="type-cate">
                                CATEGORY: <span>{productDetail.category}</span>
                            </p>
                        </div>
                    </Col>
                </Row>
                <div className="long-desc">
                    <div className={`title-desc ${desc && "active"}`} onClick={handleDesc}>
                        <h2>Đặc điểm nổi bật</h2>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <p className={desc && "active"}>{productDetail.desc}</p>
                </div>
                <div className="product-relate">
                    <h2>Sản phẩm liên quan</h2>
                    <div className="list-related">
                        {selected.map((item) => (
                            <CardProduct key={item.id} id={item.id} img={item.img} name={item.name} price={item.price} rating={item.rating}></CardProduct>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductDetail;
