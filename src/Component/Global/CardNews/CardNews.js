import React from "react";
import "./CardNews.css";

const CardNews = (props) => {
    return (
        <div className="card-news">
            <img src={props.image} alt="" />
            <div className="right-news">
                <p>{props.category}</p>
                <h3>{props.title}</h3>
                <p className="athletic">
                    BY <span>{props.author}</span>
                </p>
            </div>
            <p>{props.date}</p>
        </div>
    );
};

export default CardNews;
