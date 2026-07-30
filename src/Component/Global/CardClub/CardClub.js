import React from "react";
import "./CardClub.css";
import Button from "../../Global/Button/Button";

const CardClub = (props) => {
    return (
        <div className="club-item">
            <img src={props.img} alt="" />
            <div className="club-info">
                <h3>{props.name}</h3>
                <div className="address-club">
                    <i className="fa-solid fa-location-dot"></i>
                    <p>{props.address}</p>
                </div>
                <Button text="Xem thêm"></Button>
            </div>
        </div>
    );
};

export default CardClub;
