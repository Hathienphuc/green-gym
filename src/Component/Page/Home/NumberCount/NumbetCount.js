import React from "react";
import "./NumberCount.css";
import { Col, Container, Row } from "react-bootstrap";
import Icon from "../../../Global/Icon/Icon";
import CountUp from "react-countup";
import useAOS from "../../../Customhooks/AOS/useAOS";

const NumbetCount = () => {
    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="number-count" data-aos="fade-up">
            <Container fluid>
                <Row className="number-content">
                    <Col xs={12} sm={6} md={6} lg={3} xl={3} xxl={3}>
                        <div className="item">
                            <div className="title">
                                <Icon></Icon>
                                <h3>CÂU LẠC BỘ</h3>
                            </div>
                            <p>
                                <CountUp end={600} duration={2} enableScrollSpy/>
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3} xl={3} xxl={3}>
                        <div className="item">
                            <div className="title">
                                <Icon></Icon>
                                <h3>HUẤN LUYỆN VIÊN</h3>
                            </div>
                            <p>
                                <CountUp end={1200} duration={2} separator="" enableScrollSpy/>
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3} xl={3} xxl={3}>
                        <div className="item">
                            <div className="title">
                                <Icon></Icon>
                                <h3>SẢN PHẨM</h3>
                            </div>
                            <p>
                                <CountUp end={280} duration={2} enableScrollSpy/>
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3} xl={3} xxl={3}>
                        <div className="item">
                            <div className="title">
                                <Icon></Icon>
                                <h3>KHÓA TẬP</h3>
                            </div>
                            <p>
                                <CountUp end={100} duration={2} enableScrollSpy/>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NumbetCount;
