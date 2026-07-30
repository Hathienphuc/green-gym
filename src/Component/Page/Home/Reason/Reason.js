import React, { useState } from "react";
import "./Reason.css";
import { Col, Container, Row } from "react-bootstrap";
import Icon from "../../../Global/Icon/Icon";
import useAOS from "../../../Customhooks/AOS/useAOS";

const Reason = () => {
    const features = [
        {
            title: "Phòng tập thể dục hiện đại",
            content: "Phòng tập thể dục rộng rãi, được trang bị đầy đủ các máy tập thể dục hiện đại.",
            icon: "fa-solid fa-shop",
        },
        {
            title: "Mở cửa 24/7",
            content: "Phục vụ mọi lúc, giúp bạn linh hoạt trong việc sắp xếp thời gian tập luyện.",
            icon: "fa-solid fa-clock",
        },
        {
            title: "Dịch vụ FREE",
            content: "Nhiều dịch vụ miễn phí đi kèm, hỗ trợ trải nghiệm tập luyện tốt nhất.",
            icon: "fa-solid fa-bottle-water",
        },
        {
            title: "Huấn luyện viên chuyên nghiệp",
            content: "Tận dụng phòng tập thể dục rộng rãi của chúng tôi được trang bị một loạt các máy tập thể dục thể dục để bạn có thể đạt được lợi ích tối đa từ việc tập luyện.",
            icon: "fa-solid fa-person",
        },
        {
            title: "Giá cả hợp lý",
            content: "Chi phí phù hợp với nhiều đối tượng khách hàng.",
            icon: "fa-solid fa-money-check-dollar",
        },
    ];

    const [reason, setReason] = useState(0);
    const handleReason = (index) => {
        setReason(index);
    };

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="reason">
            <Container fluid>
                <Row className="reason-content" data-aos="fade-up">
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto" xxl="auto" className="reason-section">
                        <div className="reason-title">
                            <Icon></Icon>
                            <h2>LÝ DO CHỌN GREEN GYM</h2>
                        </div>
                        <div className="video-left">
                            <video src="/Image/Video_reason.mp4" autoPlay muted loop playsInline></video>
                        </div>
                        <div className="reason-flip"></div>
                        <div className="reason-center">
                            <i className={features[reason].icon}></i>
                            <h3>{features[reason].title}</h3>
                            <p>{features[reason].content}</p>
                        </div>
                        <div className="reason-list">
                            <ul>
                                <li className={reason === 0 && "active"} onClick={() => handleReason(0)}>
                                    <i className="fa-solid fa-shop"></i>
                                    <h4>Phòng tập thể dục hiện đại</h4>
                                </li>
                                <li className={reason === 1 && "active"} onClick={() => handleReason(1)}>
                                    <i className="fa-solid fa-clock"></i>
                                    <h4>Mở cửa 24/7</h4>
                                </li>
                                <li className={reason === 2 && "active"} onClick={() => handleReason(2)}>
                                    <i className="fa-solid fa-bottle-water"></i>
                                    <h4>Dịch vụ FREE</h4>
                                </li>
                                <li className={reason === 3 && "active"} onClick={() => handleReason(3)}>
                                    <i className="fa-solid fa-person"></i>
                                    <h4>Huấn luyện viên chuyên nghiệp</h4>
                                </li>
                                <li className={reason === 4 && "active"} onClick={() => handleReason(4)}>
                                    <i className="fa-solid fa-money-check-dollar"></i>
                                    <h4>Giá cả hợp lý</h4>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Reason;
