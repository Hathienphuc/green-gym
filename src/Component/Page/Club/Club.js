import React, { useState } from "react";
import "./Club.css";
import { Container } from "react-bootstrap";
import Heading from "../../Global/Heading/Heading";
import Select from "react-select";
import CardClub from "../../Global/CardClub/CardClub";
import useAOS from "../../Customhooks/AOS/useAOS";

const Club = () => {
    const club = [
        {
            id: "1",
            name: "Lê Hồng Phong",
            address: "197C Lê Hồng Phong, Phường Chợ Quán, Thành phố Hồ Chí Minh",
            district: "Quận 5",
            img: "https://thenewgym.vn/wp-content/uploads/2025/04/TheNewGym-297.webp",
            thumb: [
                "https://thenewgym.vn/wp-content/uploads/2025/08/the-new-gym-le-hong-phong-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/08/the-new-gym-le-hong-phong-5.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/08/the-new-gym-le-hong-phong-2.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/08/the-new-gym-le-hong-phong-3.webp",
            ],
        },
        {
            id: "2",
            name: "Lý Thường Kiệt",
            address: "299/7 Lý Thường Kiệt, Phường Phú Thọ, Thành phố Hồ Chí Minh",
            district: "Quận 11",
            img: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Rosemount%2C_MN_-_Anytime_Fitness_gym_exterior_%2843460728481%29.jpg?20180722191133",
            thumb: [
                "https://thenewgym.vn/wp-content/uploads/2025/04/KHONG-GIAN_LTK-3.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/04/KHONG-GIAN_LTK-4.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/04/KHONG-GIAN_LTK-9.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/04/KHONG-GIAN_LTK-5.webp",
            ],
        },
        {
            id: "3",
            name: "Nam Kỳ Khởi Nghĩa",
            address: "264 Nam Kỳ khởi Nghĩa, Phường Xuân Hòa, Thành phố Hồ Chí Minh",
            district: "Quận 11",
            img: "https://thenewgym.vn/wp-content/uploads/2025/04/MAZ_1034.webp",
            thumb: [
                "https://thenewgym.vn/wp-content/uploads/2024/11/z5809412453222_161ab2ce07d0626077e9766b1ca23fe2.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/11/z5809412453222_161ab2ce07d0626077e9766b1ca23fe2.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/11/z5809412424344_1a9259e7c1762b70d4e83b6aefb82cda.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/11/z5809412491969_ecf82a25c9cf0b30d418b938610726f9.webp",
            ],
        },
        {
            id: "4",
            name: "Hoàng Văn Thụ",
            address: "Lầu 5, 1/1 Hoàng Việt, Phường Tân Sơn Nhất, Thành phố Hồ Chí Minh",
            district: "Quận Tân Bình",
            img: "https://thenewgym.vn/wp-content/uploads/2025/04/MAZ_1034.webp",
            thumb: [
                "https://thenewgym.vn/wp-content/uploads/2024/11/z5809412453222_161ab2ce07d0626077e9766b1ca23fe2.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/11/z5809412453222_161ab2ce07d0626077e9766b1ca23fe2.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/11/z5809412424344_1a9259e7c1762b70d4e83b6aefb82cda.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/11/z5809412491969_ecf82a25c9cf0b30d418b938610726f9.webp",
            ],
        },
        {
            id: "5",
            name: "Quang Trung",
            address: "185 - 189 Quang Trung, Phường Gò Vấp, Thành phố Hồ Chí Minh",
            district: "Quận Gò Vấp",
            img: "https://thenewgym.vn/wp-content/uploads/2025/04/MAT-TIEN-QT-1.webp",
            thumb: [
                "https://thenewgym.vn/wp-content/uploads/2024/10/DSC08900-2-2048x1365-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/09/10.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/09/QT-STUDIO.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/DSC08846-1-2048x1365-1.webp",
            ],
        },
        {
            id: "6",
            name: "Điện Biên Phủ",
            address: "256 Điện Biên Phủ, Phường Xuân Hòa, Thành phố Hồ Chí Minh",
            district: "Quận 3",
            img: "https://thenewgym.vn/wp-content/uploads/2025/04/DBP-MT-1.webp",
            thumb: [
                "https://thenewgym.vn/wp-content/uploads/2024/10/CARDIO-3-2048x1367-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/GIP1463.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/FUNCIONAL-1-2048x1531-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/09/DBP-STUDIO.webp",
            ],
        },
        {
            id: "7",
            name: "Nguyễn Thị Thập",
            address: "128 Nguyễn Thị Thập, Phường Tân Thuận, Thành phố Hồ Chí Minh",
            district: "Quận Bình Thạnh",
            img: "https://thenewgym.vn/wp-content/uploads/2025/04/DSC_1975.webp",
            thumb: [
                "https://thenewgym.vn/wp-content/uploads/2025/09/Ban-sao-cua-NVD_9653.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/STRENGTH.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/FUNCIONAL-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/09/UVK-STUDIO.webp",
            ],
        },
        {
            id: "8",
            name: "Hậu Giang",
            address: "1068 Hậu Giang, Phường Phú Lâm, Thành phố Hồ Chí Minh",
            district: "Quận 6",
            img: "https://thenewgym.vn/wp-content/uploads/2025/04/TheNewGym-297.webp",
            thumb: [
                "https://thenewgym.vn/wp-content/uploads/2024/10/CARDIO-1-2048x1366-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/STRENGTH-2048x1365-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/FUNCIONAL-2048x1366-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2025/09/HG-STUDIO.webp",
            ],
        },
        {
            id: "9",
            name: "Âu Cơ",
            address: "307 - 309 Âu Cơ, Phường Tân Phú, Thành phố Hồ Chí Minh",
            district: "Quận Tân Phú",
            img: "https://thenewgym.vn/wp-content/uploads/2025/04/AC-MT-1.webp",
            thumb: [
                "https://thenewgym.vn/wp-content/uploads/2024/10/CARDIO-1-2048x1363-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/LADIES-ONLY-2048x1363-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/DSC4246-2048x1442-1.webp",
                "https://thenewgym.vn/wp-content/uploads/2024/10/LOWER-BODY-2048x1152-1.webp",
            ],
        },
    ];

    const allDistrict = club.map((item) => item.district);
    const uniqueDistrict = allDistrict.filter((district, index) => allDistrict.indexOf(district) === index);
    const district = ["Tất cả", ...uniqueDistrict];
    const [selectDistrict, setSelectDistrict] = useState("Tất cả");
    const filterClub = selectDistrict === "Tất cả" ? club : club.filter((club) => club.district === selectDistrict);
    const districtOption = district.map((d) => ({ value: d, label: d }));

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="club">
            <Container fluid>
                <Heading title="Câu lạc bộ" breadcrumbs={[{ path: "/ Giới thiệu " }]}></Heading>
                <div className="club-content" data-aos="fade-up">
                    <h2>Tìm phòng tập gần nhất</h2>
                    <p>Hệ thống phòng tập gym và yoga của Green Gym có mặt khắp các quận TPHCM. Lựa chọn phòng tập gần bạn nhất để có thể tập luyện dễ dàng và tiết kiệm thời gian.</p>
                    <div className="sort-club">
                        <Select
                            placeholder="Chọn quận/huyện"
                            classNamePrefix="select-district"
                            options={districtOption}
                            value={{ value: selectDistrict, label: selectDistrict }}
                            onChange={(option) => setSelectDistrict(option.value)}
                        />
                    </div>
                    <div className="list-club">
                        {filterClub.map((item) => (
                            <CardClub key={item.id} img={item.img} name={item.name} address={item.address}></CardClub>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Club;
