import React, { useState } from "react";
import "./Review.css";
import { Container } from "react-bootstrap";
import Pagination from "../../../Global/Pagination/Pagination";
import useAOS from "../../../Customhooks/AOS/useAOS";

const Review = () => {
    const reviewer = [
        {
            id: 1,
            image: "https://i.pravatar.cc/150?img=11",
            rating: 5,
            content: "PHÒNG TẬP THỂ DỤC TUYỆT VỜI. MỘT PHÒNG TẬP THỂ DỤC MỚI VỚI THIẾT BỊ VÀ CHẤT LƯỢNG HIỆN ĐẠI GIÚP VIỆC TẬP LUYỆN DỄ DÀNG HƠN. LUÔN SẴN SÀNG HỖ TRỢ BẠN.",
            name: "Hà Thiên Phúc",
            location: "TP.HCM",
        },
        {
            id: 2,
            image: "https://i.pravatar.cc/150?img=22",
            rating: 4,
            content: "HLV rất nhiệt tình và chuyên nghiệp. Phòng tập sạch sẽ, thoáng mát. Mình rất hài lòng và sẽ tiếp tục gắn bó lâu dài.",
            name: "Nguyễn Minh Anh",
            location: "Hà Nội",
        },
        {
            id: 3,
            image: "https://i.pravatar.cc/150?img=33",
            rating: 5,
            content: "Không gian rộng rãi, nhiều máy tập mới và hiện đại. Giá cả hợp lý so với chất lượng dịch vụ. Rất đáng để trải nghiệm.",
            name: "Trần Quang Huy",
            location: "Đà Nẵng",
        },
    ];

    const [currentPage, setCurrentPage] = useState(0);

    const PRODUCTS_PER_PAGE = 1;
    const totalPages = Math.ceil(reviewer.length / PRODUCTS_PER_PAGE);
    const currentProducts = reviewer.slice(currentPage * PRODUCTS_PER_PAGE, (currentPage + 1) * PRODUCTS_PER_PAGE);

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="review" data-aos="fade-up">
            <Container fluid>
                <h2>CẢM NHẬN CỦA HỘI VIÊN</h2>
                <div className="review-content">
                    <div className="member">
                        {currentProducts.map((item) => (
                            <div className="review-item" key={item.id}>
                                <img src={item.image} alt="" />
                                <div className="right-review">
                                    <div className="rating-review">
                                        {Array.from({ length: item.rating }).map((_, index) => (
                                            <i key={index} className="fa-solid fa-star"></i>
                                        ))}
                                    </div>
                                    <p>“{item.content}”</p>
                                    <p className="name-rating">{item.name}</p>
                                    <div className="location-rating">
                                        <i className="fa-solid fa-location-dot"></i>
                                        <p>{item.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}></Pagination>
                </div>
            </Container>
        </div>
    );
};

export default Review;
