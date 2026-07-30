import React from "react";
import "./Filter.css";
import Icon from "../Icon/Icon";

const Filter = (props) => {
    return (
        <div className="filter-tool">
            <div className="title-filter">
                <Icon></Icon>
                <h3>{props.title}</h3>
            </div>
            <div className="filter-category">
                {Array.from({ length: props.count }).map((_, index) => (
                    <label key={index}>
                        <input type="radio" name={props.name} defaultChecked={props.label?.[index] === "All"} value={props.value?.[index]} onChange={props.onChange} />
                        {props.label?.[index]}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filter;
