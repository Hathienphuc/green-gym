import React, { useEffect, useRef, useState } from "react";
import "./Shop.css";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "../../Global/Heading/Heading";
import CardProduct from "../../Global/CardProduct/CardProduct";
import Icon from "../../Global/Icon/Icon";
import Button from "../../Global/Button/Button";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useFetch from "../../Customhooks/Data/useFetch";
import Pagination from "../../Global/Pagination/Pagination";
import useFilterSort from "../../Customhooks/FilterSort/useFilterSort";
import Filter from "../../Global/Filter/Filter";
import Select from "react-select";
import useSearch from "../../Customhooks/Search/useSearch";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAOS from "../../Customhooks/AOS/useAOS";

const Shop = () => {
    const { data: arrProduct } = useFetch(`https://6867db77d5933161d70a13d8.mockapi.io/product`);

    const priceFilter = arrProduct.map((item) => item.price);
    const PRICE_MIN = 0;
    const PRICE_MAX = priceFilter.length ? Math.max(...priceFilter) : 500000;

    const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const { shop, filterByPrice, handleSort } = useFilterSort(arrProduct, setProduct, setCurrentPage);

    const handlePriceFilter = () => {
        filterByPrice(priceRange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        filterByPrice([PRICE_MIN, PRICE_MAX]);
    }, [arrProduct]);

    const options = [
        { value: "price-desc", label: "Sắp xếp giảm dần theo giá" },
        { value: "price-asc", label: "Sắp xếp tăng dần theo giá" },
        { value: "rating-desc", label: "Sắp xếp giảm dần theo đánh giá" },
        { value: "rating-asc", label: "Sắp xếp tăng dần theo đánh giá" },
    ];

    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("search") || "";
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
        setSearchKeyword(keyword);
        setCurrentPage(0);
    }, [keyword]);

    const searchedProduct = useSearch(product, searchKeyword);

    const PRODUCTS_PER_PAGE = 6;
    const totalPages = Math.ceil(searchedProduct.length / PRODUCTS_PER_PAGE);
    const currentProducts = searchedProduct.slice(currentPage * PRODUCTS_PER_PAGE, (currentPage + 1) * PRODUCTS_PER_PAGE);

    const toastShown = useRef(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (product.length === 0) return;
        if (searchKeyword.trim() && searchedProduct.length === 0) {
            if (!toastShown.current) {
                toast.error("Không tìm thấy sản phẩm!", {
                    position: "top-center",
                });
                toastShown.current = true;
            }
        } else {
            toastShown.current = false;
        }
    }, [searchedProduct, searchKeyword]);

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="shop">
            <Container fluid>
                <Heading title="Cửa hàng" path="Cửa hàng"></Heading>
                <Row className="shop-content" data-aos="fade-up">
                    <Col xs={12} sm={12} md={12} lg={9} xl={9} xxl={9}>
                        <div className="list-product">
                            {searchedProduct.length > 0 ? (
                                <>
                                    {currentProducts.map((item) => (
                                        <CardProduct key={item.id} id={item.id} img={item.img} name={item.name} price={item.price} rating={item.rating} stock={item.stock} />
                                    ))}

                                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                                </>
                            ) : (
                                product.length > 0 && searchKeyword.trim() && <h3 className="not-found-product">Không tìm thấy sản phẩm</h3>
                            )}
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3} className="filter-right">
                        <div className="sort-content">
                            <Select options={options} placeholder="Lọc theo thứ tự" isSearchable={false} classNamePrefix="sort" onChange={(option) => handleSort(option?.value)} />
                        </div>
                        <Filter
                            title="Danh mục"
                            count={6}
                            name="category"
                            label={["All", "Dụng cụ thể hình", "Dụng cụ sức mạnh", "Phụ kiện thể thao", "Thiết bị cardio", "Dụng cụ yoga"]}
                            value={["All", "Dụng cụ thể hình", "Dụng cụ sức mạnh", "Phụ kiện thể thao", "Thiết bị cardio", "Dụng cụ yoga"]}
                            onChange={(e) => shop("category", e.target.value)}
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
                            title="Đánh giá"
                            count={6}
                            name="rating"
                            label={["All", "1 sao", "2 sao", "3 sao", "4 sao", "5 sao"]}
                            value={["All", "1", "2", "3", "4", "5"]}
                            onChange={(e) => shop("rating", e.target.value)}
                        ></Filter>
                        <Filter
                            title="Tình trạng"
                            count={3}
                            name="stock"
                            label={["All", "Còn hàng", "Hết hàng"]}
                            value={["All", "Còn hàng", "Hết hàng"]}
                            onChange={(e) => shop("stock", e.target.value)}
                        ></Filter>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Shop;
