import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Course.css";
import Heading from "../../Global/Heading/Heading";
import CardCourse from "../../Global/CardCourse/CardCourse";
import useFetch from "../../Customhooks/Data/useFetch";
import Pagination from "../../Global/Pagination/Pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useFilterSort from "../../Customhooks/FilterSort/useFilterSort";
import Filter from "../../Global/Filter/Filter";
import Select from "react-select";
import Icon from "../../Global/Icon/Icon";
import Button from "../../Global/Button/Button";
import useSearch from "../../Customhooks/Search/useSearch";
import useAOS from "../../Customhooks/AOS/useAOS";
import { toast } from "react-toastify";

const Course = () => {
    const { data: arrCourse } = useFetch(`https://6867db77d5933161d70a13d8.mockapi.io/course`);

    const [course, setCourse] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const searchedCourse = useSearch(course, searchKeyword);

    const priceFilter = arrCourse.map((item) => item.price);
    const PRICE_MIN = 0;
    const PRICE_MAX = priceFilter.length ? Math.max(...priceFilter) : 500000;

    const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const { shop, filterByPrice, handleSort } = useFilterSort(arrCourse, setCourse, setCurrentPage);

    const handlePriceFilter = () => {
        filterByPrice(priceRange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        filterByPrice([PRICE_MIN, PRICE_MAX]);
    }, [arrCourse]);

    const options = [
        { value: "price-desc", label: "Sắp xếp giảm dần theo giá" },
        { value: "price-asc", label: "Sắp xếp tăng dần theo giá" },
    ];

    const COURSE_PER_PAGE = 6;
    const totalPages = Math.ceil(searchedCourse.length / COURSE_PER_PAGE);
    const currentCourse = searchedCourse.slice(currentPage * COURSE_PER_PAGE, (currentPage + 1) * COURSE_PER_PAGE);

    const toastShown = useRef(false);

    useEffect(() => {
        if (searchKeyword.trim() && searchedCourse.length === 0) {
            if (!toastShown.current) {
                toast.error("Không tìm thấy khóa tập!", {
                    position: "top-center",
                });
                toastShown.current = true;
            }
        } else {
            toastShown.current = false;
        }
    }, [searchedCourse, searchKeyword]);

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="course">
            <Container fluid>
                <Heading title="Khóa tập" breadcrumbs={[{ path: "/ Dịch vụ " }]}></Heading>
                <Row className="course-content" data-aos="fade-up">
                    <Col xs={12} sm={12} md={12} lg={9} xl={9} xxl={9}>
                        <div className="list-course">
                            {searchedCourse.length > 0 ? (
                                <>
                                    {currentCourse.map((item) => (
                                        <CardCourse
                                            key={item.id}
                                            id={item.id}
                                            img={item.img}
                                            title={item.title}
                                            startDate={item.startDate}
                                            time={item.time}
                                            coachImg={item.coachImg}
                                            coach={item.coach}
                                            price={item.price}
                                            capacity={item.capacity}
                                        />
                                    ))}
                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                                </>
                            ) : (
                                searchKeyword.trim() && <h3 className="not-found-course">Không tìm thấy khóa tập</h3>
                            )}
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                        <div className="sort-content">
                            <input
                                type="text"
                                name=""
                                placeholder="Tìm kiếm..."
                                value={searchInput}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearchInput(value);
                                    if (value.trim() === "") {
                                        setSearchKeyword("");
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setSearchKeyword(searchInput);
                                        setCurrentPage(0);
                                    }
                                }}
                            />
                            <Select options={options} placeholder="Lọc theo thứ tự" isSearchable={false} classNamePrefix="sort" onChange={(option) => handleSort(option?.value)} />
                            <i
                                className="fa-solid fa-magnifying-glass"
                                onClick={() => {
                                    setSearchKeyword(searchInput);
                                    setCurrentPage(0);
                                }}
                            ></i>
                        </div>
                        <Filter
                            title="Mức độ"
                            count={4}
                            name="level"
                            label={["All", "Cơ bản", "Trung bình", "Nâng cao"]}
                            value={["All", "Cơ bản", "Trung bình", "Nâng cao"]}
                            onChange={(e) => shop("level", e.target.value)}
                        ></Filter>
                        <div className="filter-price">
                            <div className="title-price">
                                <Icon></Icon>
                                <h3>Giá tiền</h3>
                            </div>
                            <div className="single-range-container">
                                <Slider range min={PRICE_MIN} max={PRICE_MAX} step={10000} value={priceRange} onChange={handlePriceChange} />
                                <div className="range-footer">
                                    <Button text="Lọc" onClick={handlePriceFilter}></Button>
                                    <p className="price-label">
                                        Giá: {priceRange[0].toLocaleString()}đ - {priceRange[1].toLocaleString()}đ
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Filter
                            title="Gói tập"
                            count={4}
                            name="time"
                            label={["All", "1 tháng", "6 tháng", "12 tháng"]}
                            value={["All", "1 tháng", "6 tháng", "12 tháng"]}
                            onChange={(e) => shop("time", e.target.value)}
                        ></Filter>
                        <Filter
                            title="Tình trạng"
                            count={3}
                            name="capacity"
                            label={["All", "Đủ số lượng", "Chưa đủ số lượng"]}
                            value={["All", "Đủ số lượng", "Chưa đủ số lượng"]}
                            onChange={(e) => shop("capacity", e.target.value)}
                        ></Filter>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Course;
