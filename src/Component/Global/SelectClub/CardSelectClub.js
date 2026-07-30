import React from "react";
import "./CardSelectClub.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/Cart/CartContext";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

const CardSelectClub = (props) => {
    const { courseDetail } = props;
    const { addToCart } = useCart();
    const navigateCart = useNavigate();
    const newId = uuid();

    const handleAddCourseToCart = (course) => {
        const added = addToCart(course, "course");
        if (added) {
            toast.success("Đã thêm khóa học!", { position: "top-center" });
        } else {
            toast.error("Khóa học này đã có trong giỏ hàng!", { position: "top-center" });
        }
    };

    return (
        <div className="select-club-item">
            <div className="select-club-info">
                <h2>{props.name}</h2>
                <div className="select-club-address">
                    <i className="fa-solid fa-location-dot"></i>
                    <p>{props.address}</p>
                </div>
            </div>
            <div className="select-club-tool">
                <Button
                    text="Chọn câu lạc bộ"
                    onClick={() => {
                        const course = {
                            cartCourseId: newId,
                            id: courseDetail.id,
                            title: courseDetail.title,
                            price: courseDetail.price,
                            clubName: props.name,
                            img: courseDetail.img,
                        };
                        handleAddCourseToCart(course);
                        navigateCart("/cart");
                    }}
                />
            </div>
        </div>
    );
};

export default CardSelectClub;
