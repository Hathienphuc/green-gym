import React from "react";
import "./CardCourse.css";
import { Link } from "react-router-dom";

const CardCourse = (props) => {
    const maxCapacity = 100;
    const capacity = props.capacity;
    const progressPercent = ((maxCapacity - capacity) / maxCapacity) * 100;

    return (
        <Link to={`/service/course/detail-course/${props.id}`} className="card-product">
            <div className="img-course">
                <img src={props.img} alt="" />
                {props.capacity === 0 && <div className="label">ĐỦ SỐ LƯỢNG</div>}
            </div>
            <div className="info-card">
                <h3>{props.title}</h3>
                <div className="icon-item">
                    <i className="fa-solid fa-calendar-days"></i>
                    <p>
                        <span>Khai giảng:</span> {props.startDate}
                    </p>
                </div>
                <div className="icon-item">
                    <i className="fa-solid fa-clock"></i>
                    <p>
                        <span>Thời hạn:</span> {props.time}
                    </p>
                </div>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
                </div>
            </div>
            <div className="coach">
                <div className="info-coach-card">
                    <img src={props.coachImg} alt="" />
                    <div className="name">
                        <h4>{props.coach}</h4>
                        <p className="position">Huấn luyện viên</p>
                    </div>
                </div>
                <p className="price">{props.price.toLocaleString()}đ</p>
            </div>
        </Link>
    );
};

export default CardCourse;
