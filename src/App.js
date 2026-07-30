import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Component/Page/Home/Home";
import Header from "./Component/Global/Header/Header";
import { Route, Routes } from "react-router-dom";
import Course from "./Component/Page/Course/Course";
import Shop from "./Component/Page/Shop/Shop";
import ProductDetail from "./Component/Page/ProductDetail/ProductDetail";
import CourseDetail from "./Component/Page/CourseDetail/CourseDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { LoginProvider } from "./Component/Context/Login/LoginContext";
import { CartProvider } from "./Component/Context/Cart/CartContext";
import Cart from "./Component/Page/Cart/Cart";
import Footer from "./Component/Global/Footer/Footer";
import Contact from "./Component/Page/Contact/Contact";
import About from "./Component/Page/About/About";
import Coach from "./Component/Page/Coach/Coach";
import Blog from "./Component/Page/Blog/Blog";
import Club from "./Component/Page/Club/Club";
import BMI from "./Component/Page/BMI/BMI";
import SelectClub from "./Component/Page/SelectClub/SelectClub";
import Account from "./Component/Page/Account/Account";

function App() {
    return (
        <CartProvider>
            <LoginProvider>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/service/course" element={<Course></Course>}></Route>
                    <Route path="/shop" element={<Shop></Shop>}></Route>
                    <Route path="/shop/detail-product/:slug" element={<ProductDetail></ProductDetail>}></Route>
                    <Route path="/service/course/detail-course/:slug" element={<CourseDetail></CourseDetail>}></Route>
                    <Route path="/cart" element={<Cart></Cart>}></Route>
                    <Route path="/contact" element={<Contact></Contact>}></Route>
                    <Route path="/about/greengym" element={<About></About>}></Route>
                    <Route path="/about/coach" element={<Coach></Coach>}></Route>
                    <Route path="/blog" element={<Blog></Blog>}></Route>
                    <Route path="/about/club" element={<Club></Club>}></Route>
                    <Route path="/service/bmi" element={<BMI></BMI>}></Route>
                    <Route path="/service/course/detail-course/select-club/:slug" element={<SelectClub></SelectClub>}></Route>
                    <Route path="/account" element={<Account></Account>}></Route>
                </Routes>
                <ToastContainer autoClose={2000} closeButton={false} />
                <Footer></Footer>
            </LoginProvider>
        </CartProvider>
    );
}

export default App;
