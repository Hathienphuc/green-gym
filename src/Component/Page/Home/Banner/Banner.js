import React, { useState } from "react";
import "./Banner.css";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../../Global/Button/Button";
import Icon from "../../../Global/Icon/Icon";
import ModalForm from "../../../Global/ModalForm/ModalForm";
import useAOS from "../../../Customhooks/AOS/useAOS";
import { useLogin } from "../../../Context/Login/LoginContext";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const [showAuth, setShowAuth] = useState(false);
    const { login } = useLogin();
    const navigate = useNavigate();

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div>
            <div className="banner">
                <Container fluid>
                    <Row className="banner-content">
                        <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                            <div className="heading">
                                <h2>PHÒNG TẬP TỐT NHẤT CỦA THÀNH PHỐ</h2>
                                <h1>
                                    TẬP LUYỆN VỚI TRẢI NGHIỆM <br />
                                    TẬP THỂ DỤC TỐT NHẤT Ở <br />
                                    <span>GREEN GYM</span>
                                </h1>
                                <Button
                                    text="Tham gia ngay"
                                    onClick={() => {
                                        if (login?.username) {
                                            navigate("/service/course");
                                        } else {
                                            setShowAuth(true);
                                        }
                                    }}
                                ></Button>
                                <ModalForm show={showAuth} handleClose={() => setShowAuth(false)} mode="login" />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                            <div className="right-banner">
                                <img src="/Image/Banner 1.png" alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container fluid>
                <Row className="introduce" data-aos="fade-up">
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className="weight">
                        <div className="intro">
                            <img src="/Image/Intro.png" alt="" />
                        </div>
                        <div className="info">
                            <Icon></Icon>
                            <h3>KHU VỰC TẬP LUYỆN FREE WEIGHTS</h3>
                            <Button text="Đăng ký ngay" to="/service/course"></Button>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className="weight">
                        <div className="intro">
                            <img src="/Image/Intro 1.png" alt="" />
                        </div>
                        <div className="info">
                            <Icon></Icon>
                            <h3>KHU VỰC TẬP LUYỆN CARDIO</h3>
                            <Button text="Đăng ký ngay" to="/service/course"></Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Banner;
