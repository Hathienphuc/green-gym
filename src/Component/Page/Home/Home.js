import React from "react";
import Banner from "./Banner/Banner";
import AboutHome from "./About/AboutHome";
import NumberCount from "./NumberCount/NumbetCount";
import Reason from "./Reason/Reason";
import ProductHome from "./Product/ProductHome";
import Review from "./Review/Review";
import News from "./News/News";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutHome></AboutHome>
            <NumberCount></NumberCount>
            <Reason></Reason>
            <ProductHome></ProductHome>
            <Review></Review>
            <News></News>
        </div>
    );
};

export default Home;
