import React from "react";
import "./Footer.css";
import { Col, Container, Row } from "react-bootstrap";
import useAOS from "../../Customhooks/AOS/useAOS";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";

const Footer = () => {
    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="footer" data-aos="fade-up">
            <Container fluid>
                <Row className="footer-content">
                    <Col xs={12} sm={12} md={12} lg={12} xl={5} xxl={5}>
                        <div className="left">
                            <div className="slogan">
                                <Link to="/">
                                    <img src="/Image/Logo.png" alt="" />
                                </Link>
                                <p>Chào mừng đến với Green Gym. Chúng tôi tin rằng sức khỏe thực sự bao gồm tâm trí, cơ thể và tâm hồn. Chúng tôi ở đây để hỗ trợ và hướng dẫn bạn từng bước.</p>
                            </div>
                            <div className="contact">
                                <h2>HÃY GỌI CHO CHÚNG TÔI</h2>
                                <p>1900 866 883</p>
                            </div>
                            <div className="contact">
                                <h2>THAM QUAN ĐỊA ĐIỂM CỦA CHÚNG TÔI</h2>
                                <p>94C Cao Thắng, Phường 4, Quận 3, TP.HCM</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={2} xxl={2}>
                        <ul>
                            <li className="title">
                                <Icon></Icon>
                                <h2>Green Gym</h2>
                            </li>
                            <li>
                                <Link to="/about/club">Câu lạc bộ</Link>
                            </li>
                            <li>
                                <Link to="/about/coach">Huấn luyện viên</Link>
                            </li>
                            <li>
                                <Link to="/shop">Cửa hàng</Link>
                            </li>
                            <li>
                                <Link to="/blog">Tin tức</Link>
                            </li>
                            <li>
                                <Link to="/contact">Liên hệ</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={2} xxl={2}>
                        <ul>
                            <li className="title">
                                <Icon></Icon>
                                <h2>Dịch vụ</h2>
                            </li>
                            <li>
                                <Link to="/service/course">Khóa tập</Link>
                            </li>
                            <li>
                                <Link to="/service/bmi">BMI</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={3} xxl={3}>
                        <div className="schedule">
                            <div className="date-time">
                                <p>Thứ hai</p>
                                <p>6am - 23pm</p>
                            </div>
                            <div className="date-time">
                                <p>Thứ ba</p>
                                <p>6am - 23pm</p>
                            </div>
                            <div className="date-time">
                                <p>Thứ tư</p>
                                <p>6am - 23pm</p>
                            </div>
                            <div className="date-time">
                                <p>Thứ năm</p>
                                <p>6am - 23pm</p>
                            </div>
                            <div className="date-time">
                                <p>Thứ sáu</p>
                                <p>6am - 23pm</p>
                            </div>
                            <div className="date-time">
                                <p>Thứ bảy</p>
                                <p>6am - 23pm</p>
                            </div>
                            <div className="date-time">
                                <p>Chủ nhật</p>
                                <span>Đóng cửa</span>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="trap-content">
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                        <div className="trap-title">
                            <p>
                                © 2023 <span>Green Gym</span>. Bản quyền thuộc về <span>Thiên Phúc</span>
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                        <div className="social">
                            <i className="fa-brands fa-facebook-f"></i>
                            <i className="fa-brands fa-google-plus-g"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-tiktok"></i>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={4} xxl={4}>
                        <div className="policy">
                            <p>Quyền riêng tư</p>
                            <p>Điều khoản</p>
                            <p>Cài đặt</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;
