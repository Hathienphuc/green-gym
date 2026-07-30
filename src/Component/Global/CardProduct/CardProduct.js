import React from "react";
import "./CardProduct.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../Context/Cart/CartContext";
import { v4 as uuid } from "uuid";

const CardProduct = (props) => {
    const { addToCart } = useCart();
    const newId = uuid();

    const handleAddCart = () => {
        toast.success(
            <div className="custom-toast">
                <div className="toast-header">Thêm vào giỏ hàng thành công</div>
                <div className="toast-body">
                    <img src={props.img[0]} alt="" />
                    <div className="product-info">
                        <p className="product-name">{props.name}</p>
                        <p className="product-price">{props.price.toLocaleString()}đ</p>
                    </div>
                </div>
            </div>,
        );

        const product = {
            cartProductId: newId,
            id: props.id,
            name: props.name,
            price: props.price,
            img: props.img[0],
            quantity: 1,
        };
        addToCart(product, "product");
    };

    return (
        <div className="card-shop">
            <Link to={`/shop/detail-product/${props.id}`} className="shop-item">
                <div className="img-item">
                    <img src={props.img[0]} alt="" />
                </div>
                <div className="info-item">
                    <h3>{props.name}</h3>
                    <div className="star">
                        {Array.from({ length: props.rating }).map((_, index) => (
                            <i key={index} className="fa-solid fa-star"></i>
                        ))}
                    </div>
                    <p className="price-pro">{props.price.toLocaleString()}đ</p>
                </div>
            </Link>
            {props.stock > 0 ? <Button onClick={handleAddCart} text="Thêm vào giỏ"></Button> : <p className="stock-card">Hết hàng</p>}
        </div>
    );
};

export default CardProduct;
