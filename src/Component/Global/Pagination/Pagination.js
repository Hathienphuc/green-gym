import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className="pagination-container">
            {Array.from({ length: totalPages }).map((_, index) => (
                <div key={index} className={`dot-wrapper ${index === currentPage ? "active" : ""}`} onClick={() => onPageChange(index)}>
                    <div className="dot" />
                </div>
            ))}
        </div>
    );
};

export default Pagination;
