import React from "react";
import "./CardCoach.css";

const CardCoach = (props) => {
    return (
        <div className="coach-item">
            <img src={props.img} alt="" />
            <div className="info-coach">
                <p>Huấn luyện viên</p>
                <h3>{props.name}</h3>
            </div>
            <div className="social-coach">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-youtube"></i>
            </div>
        </div>
    );
};

export default CardCoach;
