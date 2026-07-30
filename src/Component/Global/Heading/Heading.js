import React from "react";
import "./Heading.css";
import { Link } from "react-router-dom";

const Heading = (props) => {
    const breadcrumbs = props.breadcrumbs || [];

    return (
        <div className="heading-title">
            <div className="heading-content">
                <h1>{props.title}</h1>
                <p>
                    <Link to="/">Trang chủ </Link>
                    {breadcrumbs.map((item, index) => (
                        <span key={index}>{item.link ? <Link to={item.link}>{item.path}</Link> : item.path}</span>
                    ))}
                    <span className="breadcrumbs"> / {props.title}</span>
                </p>
            </div>
        </div>
    );
};

export default Heading;
