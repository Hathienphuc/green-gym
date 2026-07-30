import React, { useState } from "react";
import "./AboutHome.css";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../../Global/Button/Button";
import Icon from "../../../Global/Icon/Icon";
import useAOS from "../../../Customhooks/AOS/useAOS";
import { useLogin } from "../../../Context/Login/LoginContext";
import { useNavigate } from "react-router-dom";
import ModalForm from "../../../Global/ModalForm/ModalForm";

const AboutHome = () => {
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
        <div className="about-home">
            <Container fluid>
                <Row className="about-content" data-aos="fade-up">
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <div className="image-about">
                            <img src="/Image/About.png" alt="" />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <div className="info-about">
                            <Icon></Icon>
                            <h2>CHÚNG TÔI LÀ GREEN GYM</h2>
                            <p>
                                Tập luyện tại Green Gym để có cơ hội thay đổi ngoại hình một cách ngoạn mục. Việc luyện tập đều đặn tại Green Gym và đúng kỹ thuật, cùng với một chế độ dinh dưỡng hợp
                                lý sẽ giúp cải thiện vóc dáng một cách rõ rệt. Huấn luyện viên của Green Gym thiết kế chương trình luyện tập dựa trên chỉ số cơ thể, tình trạng sức khỏe của bạn nhằm
                                giúp bạn thấy rõ sự thay đổi ngoạn mục chỉ trong khoảng trung bình từ 6-8 tuần.
                            </p>
                            <Button
                                text="Tham gia ngay"
                                onClick={() => {
                                    if (login?.username) {
                                        navigate("/shop");
                                    } else {
                                        setShowAuth(true);
                                    }
                                }}
                            ></Button>
                            <ModalForm show={showAuth} handleClose={() => setShowAuth(false)} mode="login" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AboutHome;
