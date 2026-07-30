import React, { useEffect, useRef, useState } from "react";
import "./Blog.css";
import Heading from "../../Global/Heading/Heading";
import { Col, Container, Row } from "react-bootstrap";
import CardNews from "../../Global/CardNews/CardNews";
import Pagination from "../../Global/Pagination/Pagination";
import "rc-slider/assets/index.css";
import useFilterSort from "../../Customhooks/FilterSort/useFilterSort";
import Filter from "../../Global/Filter/Filter";
import Select from "react-select";
import useFetch from "../../Customhooks/Data/useFetch";
import useSearch from "../../Customhooks/Search/useSearch";
import useAOS from "../../Customhooks/AOS/useAOS";
import { toast } from "react-toastify";

const Blog = () => {
    const { data: arrBlog } = useFetch(`https://68ac1dc97a0bbe92cbb94f6b.mockapi.io/news`);

    const [blog, setBlog] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const searchedBlog = useSearch(blog, searchKeyword);

    const { shop, handleSort } = useFilterSort(arrBlog, setBlog, setCurrentPage);

    const options = [
        { value: "date-asc", label: "Tin tức mới nhất" },
        { value: "date-desc", label: "Tin tức cũ nhất" },
    ];

    const BLOG_PER_PAGE = 6;
    const totalPages = Math.ceil(searchedBlog.length / BLOG_PER_PAGE);
    const currentBlog = searchedBlog.slice(currentPage * BLOG_PER_PAGE, (currentPage + 1) * BLOG_PER_PAGE);

    const toastShown = useRef(false);

    useEffect(() => {
        if (searchKeyword.trim() && searchedBlog.length === 0) {
            if (!toastShown.current) {
                toast.error("Không tìm thấy tin tức!", {
                    position: "top-center",
                });
                toastShown.current = true;
            }
        } else {
            toastShown.current = false;
        }
    }, [searchedBlog, searchKeyword]);

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="blog">
            <Container fluid>
                <Heading title="Tin tức" path="Tin tức"></Heading>
                <Row className="blog-content" data-aos="fade-up">
                    <Col xs={12} sm={12} md={12} lg={9} xl={9} xxl={9}>
                        <div className="list-blog">
                            {searchedBlog.length > 0 ? (
                                <>
                                    {currentBlog.map((item) => (
                                        <CardNews key={item.id} id={item.id} image={item.image} category={item.category} title={item.title} author={item.author} date={item.date}></CardNews>
                                    ))}
                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}></Pagination>
                                </>
                            ) : (
                                searchKeyword.trim() && <h3 className="not-found-blog">Không tìm thấy tin tức</h3>
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
                            title="Danh mục"
                            count={8}
                            name="category"
                            label={["All", "Giảm cân", "Tập luyện", "Sức khỏe", "Dinh dưỡng", "Bài tập", "Phục hồi", "Phòng gym"]}
                            value={["All", "Giảm cân", "Tập luyện", "Sức khỏe", "Dinh dưỡng", "Bài tập", "Phục hồi", "Phòng gym"]}
                            onChange={(e) => shop("category", e.target.value)}
                        ></Filter>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Blog;
