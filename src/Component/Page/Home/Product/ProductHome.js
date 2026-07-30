import React, { useState } from "react";
import "./ProductHome.css";
import { Container } from "react-bootstrap";
import Icon from "../../../Global/Icon/Icon";
import CardCourse from "../../../Global/CardCourse/CardCourse";
import useFetch from "../../../Customhooks/Data/useFetch";
import Pagination from "../../../Global/Pagination/Pagination";
import CardProduct from "../../../Global/CardProduct/CardProduct";
import useAOS from "../../../Customhooks/AOS/useAOS";

const ProductHome = () => {
    const { data: arrCourse } = useFetch(`https://6867db77d5933161d70a13d8.mockapi.io/course`);
    const { data: arrProduct } = useFetch(`https://6867db77d5933161d70a13d8.mockapi.io/product`);

    const [tab, setTab] = useState("course");
    const [currentPage, setCurrentPage] = useState(0);
    const dataTab = tab === "course" ? arrCourse : arrProduct;

    const PRODUCTS_PER_PAGE = 4;
    const totalPages = Math.ceil(dataTab.length / PRODUCTS_PER_PAGE);
    const currentProducts = dataTab.slice(currentPage * PRODUCTS_PER_PAGE, (currentPage + 1) * PRODUCTS_PER_PAGE);

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="product-home" data-aos="fade-up">
            <Container fluid>
                <div className="title-list">
                    <Icon></Icon>
                    <h2>THAM GIA CÙNG GREEN GYM</h2>
                </div>
                <ul>
                    <li
                        className={tab === "course" ? "active" : ""}
                        onClick={() => {
                            setTab("course");
                            setCurrentPage(0);
                        }}
                    >
                        Khóa tập
                    </li>
                    <li
                        className={tab === "product" ? "active" : ""}
                        onClick={() => {
                            setTab("product");
                            setCurrentPage(0);
                        }}
                    >
                        Sản phẩm
                    </li>
                </ul>
                <div className="list-content">
                    {currentProducts.map((item) =>
                        tab === "course" ? (
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
                        ) : (
                            <CardProduct key={item.id} id={item.id} img={item.img} name={item.name} price={item.price} rating={item.rating} stock={item.stock}></CardProduct>
                        ),
                    )}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}></Pagination>
                </div>
            </Container>
        </div>
    );
};

export default ProductHome;
