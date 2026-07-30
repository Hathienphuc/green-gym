import React, { useState } from "react";
import "./News.css";
import { Container } from "react-bootstrap";
import CardNews from "../../../Global/CardNews/CardNews";
import useFetch from "../../../Customhooks/Data/useFetch";
import Pagination from "../../../Global/Pagination/Pagination";
import useAOS from "../../../Customhooks/AOS/useAOS";

const News = () => {
    const { data: arrNews } = useFetch(`https://68ac1dc97a0bbe92cbb94f6b.mockapi.io/news`);

    const [currentPage, setCurrentPage] = useState(0);
    const PRODUCTS_PER_PAGE = 4;
    const totalPages = Math.ceil(arrNews.length / PRODUCTS_PER_PAGE);
    const currentProducts = arrNews.slice(currentPage * PRODUCTS_PER_PAGE, (currentPage + 1) * PRODUCTS_PER_PAGE);

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="news" data-aos="fade-up">
            <Container fluid>
                <h2>Tin tức</h2>
                <div className="list-news">
                    {currentProducts.map((item) => (
                        <CardNews key={item.id} id={item.id} image={item.image} category={item.category} title={item.title} author={item.author} date={item.date}></CardNews>
                    ))}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}></Pagination>
                </div>
            </Container>
        </div>
    );
};

export default News;
