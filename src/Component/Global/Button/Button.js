import React from "react";
import "./Button.css";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        if (props.onClick) {
            props.onClick(e);
        }
        if (props.to) {
            navigate(props.to);
        }
    };

    return (
        <button onClick={handleClick}>
            {props.text}
            <i className="fa-solid fa-angle-right"></i>
        </button>
    );
};

export default Button;
