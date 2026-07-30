import React from "react";
import "./About.css";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "../../Global/Heading/Heading";
import useAOS from "../../Customhooks/AOS/useAOS";

const About = () => {
    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="about">
            <Container fluid>
                <Heading title="Green Gym" breadcrumbs={[{ path: "/ Giới thiệu " }]}></Heading>
                <img src="/Image/About1.png" alt="" data-aos="fade-up" />
                <h2 data-aos="fade-up">CHÚNG TÔI LÀ GREEN GYM</h2>
                <p className="gym-about" data-aos="fade-up">
                    Là thương hiệu về sức khỏe lớn nhất Việt Nam, Green Gym được xây dựng để mang lại hạnh phúc và tạo ra những khoảnh khắc viên mãn cho bạn trong cuộc sống bằng việc cung cấp các dịch
                    vụ phát triển sức khỏe thể chất, dinh dưỡng và tinh thần toàn diện. Nhiệm vụ của chúng tôi là tạo ra một cái nhìn và trao quyền cho môi trường nơi những người theo mọi lứa tuổi,
                    khả năng và khát vọng thể dục có thể phát triển mạnh. Chúng tôi hiểu rằng phúc lợi là một khái niệm nhiều mặt, đó là lý do tại sao chúng tôi cung cấp các giải pháp toàn diện tích
                    hợp thể lực về thể chất, tinh thần và tinh thần. Bất kể nhu cầu tập luyện, chúng tôi đều có tùy chọn hội viên dành riêng cho bạn. Tất cả hội viên Green Gym đều được quyền tập luyện
                    không giới hạn tại câu lạc bộ đăng ký 24/7, và luôn nhận được sự hỗ trợ từ đội ngũ nhân viên thân thiện, có chuyên môn bất cứ khi nào bạn cần.
                </p>
                <Row className="about-content" data-aos="fade-up">
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <div className="about-gym">
                            <h2>TIÊU CHUẨN CỦA SỰ SANG TRỌNG</h2>
                            <p>
                                Tập luyện tại hơn 600+ câu lạc bộ khắp cả nước và tận hưởng môi trường tập luyện đẳng cấp được đầu tư trang thiết bị tốt nhất. Cùng Green Gym tham quan không gian thân
                                thiện, chào đón phù hợp với tất cả mọi người. Bạn sẽ tìm hiểu tất cả về các khu vực khác nhau của câu lạc bộ và Nick sẽ chỉ cho bạn cách tận dụng tối đa thẻ hội viên
                                của mình. Đây sẽ là nơi bạn có thể bắt đầu hành trình rèn luyện sức khỏe của mình.
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <div className="img-about">
                            <img src="/Image/About2.png" alt="" />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <div className="img-info">
                            <img src="https://thenewgym.vn/wp-content/uploads/2025/02/Them-ban-them-vui.webp" alt="" />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                        <div className="about-gym">
                            <h2>THÊM BẠN THÊM VUI</h2>
                            <p>
                                Bạn của bạn là bạn của Green Gym. Thêm một người bạn tập luyện sẽ tạo ra niềm vui và động lực không ngừng. Hội viên khi giới thiệu bạn mới đăng ký gói tập ở tất cả chi
                                nhánh, cả hai bạn sẽ nhận được 2 tuần tập luyện miễn phí. Thêm bạn thêm vui! Truy cập ứng dụng Green Gym và cùng mang bạn bè đến tập luyện thôi nào!
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default About;
