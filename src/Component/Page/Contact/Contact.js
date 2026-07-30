import React from "react";
import "./Contact.css";
import { Container } from "react-bootstrap";
import Heading from "../../Global/Heading/Heading";
import Icon from "../../Global/Icon/Icon";
import useAOS from "../../Customhooks/AOS/useAOS";

const Contact = () => {
    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="contacts">
            <Container fluid>
                <Heading title="Liên hệ" path="Liên hệ"></Heading>
                <div className="contacts-content" data-aos="fade-up">
                    <div className="contacts-item">
                        <div className="title-contact">
                            <Icon></Icon>
                            <h2>Hotline</h2>
                        </div>
                        <h3>Hãy gọi cho chúng tôi</h3>
                        <p>1900 866 883</p>
                    </div>
                    <div className="contacts-item">
                        <div className="title-contact">
                            <Icon></Icon>
                            <h2>Email</h2>
                        </div>
                        <h3>Gửi thư cho chúng tôi</h3>
                        <p>greengym@gmail.com</p>
                    </div>
                    <div className="contacts-item">
                        <div className="title-contact">
                            <Icon></Icon>
                            <h2>Địa chỉ</h2>
                        </div>
                        <h3>Tham quan phòng tập của chúng tôi</h3>
                        <p>94C Cao Thắng, Phường 4, Quận 3, TP.HCM</p>
                    </div>
                </div>
                <div className="map-schedule" data-aos="fade-up">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5193744840744!2d106.6783002745171!3d10.77147605928606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3ca0da684d%3A0x32c352459c6757c8!2zSOG7jWMgVmnhu4duIEdyZWVuIEFjYWRlbXkgLSBDxqEgU-G7nyBDYW8gVGjhuq9uZyAoIEjhu5MgQ2jDrSBNaW5oICk!5e0!3m2!1svi!2s!4v1756716744059!5m2!1svi!2s"
                        width="800"
                        height="600"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="google maps"
                    />
                    <div className="schedule-contact">
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
                </div>
            </Container>
        </div>
    );
};

export default Contact;
