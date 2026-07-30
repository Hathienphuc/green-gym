import React, { useState } from "react";
import "./CourseDetail.css";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "../../Global/Heading/Heading";
import Icon from "../../Global/Icon/Icon";
import Button from "../../Global/Button/Button";
import useFetch from "../../Customhooks/Data/useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAOS from "../../Customhooks/AOS/useAOS";
import ModalForm from "../../Global/ModalForm/ModalForm";
import { toast } from "react-toastify";
import { useLogin } from "../../Context/Login/LoginContext";

const CourseDetail = () => {
    const { slug } = useParams();

    const { data: courseDetail } = useFetch(`https://6867db77d5933161d70a13d8.mockapi.io/course/${slug}`);
    const { data: arrCourse } = useFetch(`https://6867db77d5933161d70a13d8.mockapi.io/course`);

    const relatedCourse = arrCourse.filter((item) => item.level === courseDetail.level && item.id !== courseDetail.id);
    const selected = relatedCourse.slice(0, 3);

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    const { login } = useLogin();
    const [showModalLogin, setShowModalLogin] = useState(false);
    const navigateDetail = useNavigate();

    const handleRegisterCourse = () => {
        if (!login) {
            toast.error("Vui lòng đăng nhập!", {
                position: "top-center",
                autoClose: 1500,
                onClose: () => {
                    setShowModalLogin(true);
                },
            });
        } else {
            navigateDetail(`/service/course/detail-course/select-club/${courseDetail.id}`);
        }
    };

    return (
        <div className="course-detail">
            <Container fluid>
                <Heading title={courseDetail.title} breadcrumbs={[{ path: "/ Dịch vụ " }, { path: "/ Khóa tập", link: "/service/course" }]}></Heading>
                <Row className="detail-wrapper" data-aos="fade-up">
                    <Col xs={12} sm={12} md={12} lg={9} xl={9} xxl={9}>
                        <div className="wrapper-info">
                            <img src={courseDetail.img} alt="" />
                            <h2 className="heading-course">{courseDetail.title}</h2>
                            <p>{courseDetail.desc}</p>
                            <p className="detail-sologan">
                                Chúng tôi hiểu rằng phúc lợi là một khái niệm nhiều mặt, đó là lý do tại sao chúng tôi cung cấp các giải pháp toàn diện tích hợp thể lực về thể chất và tinh thần.
                            </p>
                            <div className="sologan-content">
                                <ul className="sologan-item">
                                    <li>Tư vấn thể dục 30 phút</li>
                                    <li>Phòng tập sạch sẽ</li>
                                    <li>Tập toàn hệ thống không phụ phí</li>
                                    <li>Máy lạnh mát mẻ</li>
                                </ul>
                                <ul className="sologan-item">
                                    <li>Tăng cường sức mạnh</li>
                                    <li>Cơ bắp dẻo dai</li>
                                    <li>Cơ thể vững chãi</li>
                                    <li>Mở cửa 24/7</li>
                                </ul>
                            </div>
                            <div className="wrapper-title">
                                <Icon></Icon>
                                <h2>VẬT DỤNG BẠN CẦN MANG THEO</h2>
                            </div>
                            <div className="device">
                                <div className="device-item">
                                    <i className="fa-regular fa-clipboard"></i>
                                    <p>Thẻ thành viên</p>
                                </div>
                                <div className="device-item">
                                    <i className="fa-solid fa-bottle-water"></i>
                                    <p>Nước uống</p>
                                </div>
                                <div className="device-item">
                                    <i className="fa-solid fa-toilet-paper"></i>
                                    <p>Khăn lau mồ hôi</p>
                                </div>
                                <div className="device-item">
                                    <i className="fa-solid fa-shirt"></i>
                                    <p>Quần áo thể thao</p>
                                </div>
                                <div className="device-item">
                                    <i className="fa-solid fa-candy-cane"></i>
                                    <p>Thanh protein</p>
                                </div>
                                <div className="device-item">
                                    <i className="fa-solid fa-shoe-prints"></i>
                                    <p>Giày thể thao</p>
                                </div>
                            </div>
                            <div className="wrapper-title">
                                <Icon></Icon>
                                <h2>Lợi ích khóa tập</h2>
                            </div>
                            <p className="benefit">{courseDetail.benefit}</p>
                            <div className="benefit-content">
                                <div className="benefit-item">
                                    <i className="fa-solid fa-dumbbell"></i>
                                    <p>Tăng cường sức mạnh</p>
                                </div>
                                <div className="benefit-item">
                                    <i className="fas fa-user-ninja"></i>
                                    <p>Cơ bắp dẻo dai</p>
                                </div>
                                <div className="benefit-item">
                                    <i className="fas fa-shield-halved"></i>
                                    <p>Cơ thể vững chãi</p>
                                </div>
                                <div className="benefit-item">
                                    <i className="fas fa-heart"></i>
                                    <p>Cải thiện thể trạng</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                        <div className="sidebar-detail">
                            <div className="class-info">
                                <h3 className="class-title">THÔNG TIN KHÓA TẬP</h3>
                                <div className="class-desc">
                                    <div className="desc-item">
                                        <p>GIÁ TIỀN:</p>
                                        <span className="price-class">{courseDetail?.price?.toLocaleString()}đ</span>
                                    </div>
                                    <div className="desc-item">
                                        <p>THỜI HẠN:</p>
                                        <span>{courseDetail.time}</span>
                                    </div>
                                    <div className="desc-item">
                                        <p>MỨC ĐỘ:</p>
                                        <span>{courseDetail.level}</span>
                                    </div>
                                    <div className="desc-item">
                                        <p>SỐ LƯỢNG:</p>
                                        <span>{courseDetail.capacity}</span>
                                    </div>
                                    <div className="desc-item">
                                        <p>THỜI GIAN NGHỈ:</p>
                                        <span>{courseDetail.rest}</span>
                                    </div>
                                    {courseDetail.capacity > 0 ? (
                                        <>
                                            <Button text="Đăng ký" onClick={handleRegisterCourse}></Button>
                                            <ModalForm show={showModalLogin} handleClose={() => setShowModalLogin(false)} />
                                        </>
                                    ) : (
                                        <p className="noti-course">Đủ số lượng</p>
                                    )}
                                </div>
                            </div>
                            <div className="course-relate">
                                <div className="relate-title">
                                    <Icon></Icon>
                                    <h3>Khóa tập liên quan</h3>
                                </div>
                                <div className="list-relate">
                                    {selected.map((item) => (
                                        <Link key={item.id} to={`/service/course/detail-course/${item.id}`} className="relate-item">
                                            <img src={item.img} alt="" />
                                            <div className="relate-info">
                                                <h4>{item.title}</h4>
                                                <p>{item.level}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CourseDetail;
