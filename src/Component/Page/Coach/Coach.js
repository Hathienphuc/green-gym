import React from "react";
import "./Coach.css";
import { Container } from "react-bootstrap";
import Heading from "../../Global/Heading/Heading";
import CardCoach from "../../Global/CardCoach/CardCoach";
import useAOS from "../../Customhooks/AOS/useAOS";

const Coach = () => {
    const coach = [
        {
            id: "1",
            name: "Nguyễn Văn An",
            img: "https://demo.bravisthemes.com/hadkaur/wp-content/uploads/2023/09/team1.jpg",
            desc: "Huấn luyện viên thể hình với hơn 10 năm kinh nghiệm, chuyên về dinh dưỡng và phát triển cơ bắp.",
            phone: "0912345678",
            email: "nguyen.an@example.com",
            education: "Cử nhân Giáo dục Thể chất - Đại học Thể dục Thể thao",
            skills: [
                { skill_name: "Huấn luyện thể hình", percentage: 90 },
                { skill_name: "Dinh dưỡng thể thao", percentage: 85 },
                { skill_name: "Huấn luyện sức bền", percentage: 80 },
            ],
            experience: [
                {
                    position: "Huấn luyện viên cá nhân",
                    company: "California Fitness & Yoga",
                    duration: "2015 - 2019",
                    description: "Đào tạo cá nhân, thiết kế chương trình tập luyện, tư vấn dinh dưỡng.",
                },
                {
                    position: "Trưởng nhóm huấn luyện",
                    company: "Elite Fitness",
                    duration: "2019 - nay",
                    description: "Quản lý đội ngũ huấn luyện viên, tổ chức các khóa đào tạo chuyên sâu.",
                },
            ],
            certificates: ["Chứng chỉ Huấn luyện viên cá nhân (ACE)", "Chứng chỉ Dinh dưỡng thể thao (ISSA)"],
        },
        {
            id: "2",
            name: "Trần Thị Bích",
            img: "https://demo.bravisthemes.com/hadkaur/wp-content/uploads/2023/09/team2.jpg",
            desc: "Huấn luyện viên Yoga với niềm đam mê chánh niệm và cân bằng cơ thể.",
            phone: "0987654321",
            email: "tran.bich@example.com",
            education: "Cử nhân Tâm lý học - Đại học Hà Nội",
            skills: [
                { skill_name: "Hatha Yoga", percentage: 95 },
                { skill_name: "Thiền", percentage: 90 },
                { skill_name: "Kỹ thuật thở", percentage: 85 },
            ],
            experience: [
                {
                    position: "Giáo viên Yoga",
                    company: "Yoga Plus",
                    duration: "2016 - 2020",
                    description: "Dạy các lớp Yoga nhóm, tập trung vào hơi thở và độ dẻo dai.",
                },
                {
                    position: "Huấn luyện viên Yoga cao cấp",
                    company: "Shanti Yoga Studio",
                    duration: "2020 - nay",
                    description: "Chuyên về chánh niệm và thiền để giảm căng thẳng.",
                },
            ],
            certificates: ["Chứng chỉ RYT-500 Giáo viên Yoga", "Chứng chỉ Hướng dẫn Thiền"],
        },
        {
            id: "3",
            name: "Lê Hoàng Minh",
            img: "https://demo.bravisthemes.com/hadkaur/wp-content/uploads/2023/09/team3.jpg",
            desc: "Huấn luyện viên bóng đá chuyên nghiệp với kiến thức chiến thuật sâu rộng.",
            phone: "0903123456",
            email: "hoang.minh@example.com",
            education: "Thạc sĩ Quản lý Thể thao - Học viện Thể thao Quốc gia",
            skills: [
                { skill_name: "Chiến thuật", percentage: 92 },
                { skill_name: "Lãnh đạo đội nhóm", percentage: 88 },
                { skill_name: "Huấn luyện thể lực", percentage: 85 },
            ],
            experience: [
                {
                    position: "Trợ lý huấn luyện viên",
                    company: "Hà Nội FC",
                    duration: "2014 - 2018",
                    description: "Phụ trách huấn luyện chiến thuật và phân tích trận đấu.",
                },
                {
                    position: "Huấn luyện viên trưởng",
                    company: "Đà Nẵng FC",
                    duration: "2018 - nay",
                    description: "Dẫn dắt đội bóng chuyên nghiệp tại V.League.",
                },
            ],
            certificates: ["Chứng chỉ UEFA B", "Chứng chỉ Huấn luyện AFC"],
        },
        {
            id: "4",
            name: "Phạm Thu Hằng",
            img: "https://demo.bravisthemes.com/hadkaur/wp-content/uploads/2023/09/team4.jpg",
            desc: "Huấn luyện viên Zumba và thể dục nhịp điệu được chứng nhận.",
            phone: "0934567890",
            email: "pham.hang@example.com",
            education: "Cử nhân Nghệ thuật Biểu diễn - Đại học Sư phạm Nghệ thuật Trung ương",
            skills: [
                { skill_name: "Zumba", percentage: 95 },
                { skill_name: "Dance Fitness", percentage: 90 },
                { skill_name: "Aerobic", percentage: 85 },
            ],
            experience: [
                {
                    position: "Giáo viên nhảy",
                    company: "California Fitness",
                    duration: "2015 - 2019",
                    description: "Dẫn dắt các lớp nhóm hơn 30 người.",
                },
                {
                    position: "Huấn luyện viên trưởng Zumba",
                    company: "Elite Dance Studio",
                    duration: "2019 - nay",
                    description: "Phát triển chương trình nhảy thể dục cho người lớn.",
                },
            ],
            certificates: ["Chứng chỉ Zumba Instructor", "Chứng chỉ Huấn luyện nhóm"],
        },
        {
            id: "5",
            name: "Võ Quang Duy",
            img: "https://demo.bravisthemes.com/hadkaur/wp-content/uploads/2023/09/team5.jpg",
            desc: "Huấn luyện viên võ thuật tập trung vào kỹ năng tự vệ.",
            phone: "0971234567",
            email: "quang.duy@example.com",
            education: "Cử nhân Võ thuật - Đại học Thể dục Thể thao TP.HCM",
            skills: [
                { skill_name: "Karate", percentage: 95 },
                { skill_name: "Kickboxing", percentage: 88 },
                { skill_name: "Tự vệ", percentage: 90 },
            ],
            experience: [
                {
                    position: "Huấn luyện viên võ thuật",
                    company: "Tiger Gym",
                    duration: "2012 - 2018",
                    description: "Đào tạo võ thuật cho thanh thiếu niên.",
                },
                {
                    position: "Huấn luyện viên trưởng",
                    company: "Saigon Fight Club",
                    duration: "2018 - nay",
                    description: "Dẫn dắt các lớp võ thuật và tự vệ.",
                },
            ],
            certificates: ["Huyền đai Karate 3 đẳng", "Chứng chỉ HLV Kickboxing"],
        },
        {
            id: "6",
            name: "Nguyễn Thị Mai",
            img: "https://demo.bravisthemes.com/hadkaur/wp-content/uploads/2023/09/team6.jpg",
            desc: "Huấn luyện viên Pilates chuyên về chỉnh dáng và sức mạnh cơ bụng.",
            phone: "0918765432",
            email: "nguyen.mai@example.com",
            education: "Cử nhân Vật lý trị liệu - Đại học Y Hà Nội",
            skills: [
                { skill_name: "Pilates", percentage: 95 },
                { skill_name: "Chỉnh tư thế", percentage: 90 },
                { skill_name: "Bài tập phục hồi", percentage: 85 },
            ],
            experience: [
                {
                    position: "Giáo viên Pilates",
                    company: "Core Studio",
                    duration: "2016 - 2020",
                    description: "Hỗ trợ khách hàng phục hồi sau chấn thương.",
                },
                {
                    position: "Huấn luyện viên trưởng Pilates",
                    company: "Elite Wellness Center",
                    duration: "2020 - nay",
                    description: "Chuyên tập phục hồi cột sống và chỉnh dáng.",
                },
            ],
            certificates: ["Chứng chỉ Stott Pilates", "Chứng chỉ Vật lý trị liệu cho HLV"],
        },
        {
            id: "7",
            name: "Đặng Quốc Tuấn",
            img: "https://demo.bravisthemes.com/hadkaur/wp-content/uploads/2023/09/team7.jpg",
            desc: "Huấn luyện viên bơi lội với chuyên môn về huấn luyện thi đấu.",
            phone: "0983234567",
            email: "quoc.tuan@example.com",
            education: "Cử nhân Khoa học Thể thao - Đại học TDTT TP.HCM",
            skills: [
                { skill_name: "Bơi sải", percentage: 92 },
                { skill_name: "Bơi bướm", percentage: 85 },
                { skill_name: "Huấn luyện sức bền", percentage: 88 },
            ],
            experience: [
                {
                    position: "Giáo viên bơi",
                    company: "Trung tâm Thể thao Thanh thiếu niên",
                    duration: "2013 - 2017",
                    description: "Dạy bơi cho trẻ em và thanh thiếu niên.",
                },
                {
                    position: "Huấn luyện viên bơi chuyên nghiệp",
                    company: "Đội tuyển Bơi Quốc gia",
                    duration: "2017 - nay",
                    description: "Huấn luyện vận động viên thi đấu chuyên nghiệp.",
                },
            ],
            certificates: ["Chứng chỉ HLV Bơi FINA", "Chứng chỉ Sơ cứu & CPR"],
        },
        {
            id: "8",
            name: "Hoàng Lan",
            img: "https://demo.bravisthemes.com/hadkaur/wp-content/uploads/2023/09/team8.jpg",
            desc: "Chuyên gia dinh dưỡng giúp khách hàng giảm cân bền vững.",
            phone: "0963456789",
            email: "hoang.lan@example.com",
            education: "Thạc sĩ Dinh dưỡng - Đại học Y",
            skills: [
                { skill_name: "Lập kế hoạch bữa ăn", percentage: 95 },
                { skill_name: "Huấn luyện giảm cân", percentage: 90 },
                { skill_name: "Thực phẩm bổ sung thể thao", percentage: 80 },
            ],
            experience: [
                {
                    position: "Chuyên viên dinh dưỡng",
                    company: "Phòng khám Wellness",
                    duration: "2015 - 2019",
                    description: "Xây dựng thực đơn giảm cân và tăng cơ.",
                },
                {
                    position: "Huấn luyện viên dinh dưỡng trưởng",
                    company: "FitLife Center",
                    duration: "2019 - nay",
                    description: "Chuyên lập kế hoạch dinh dưỡng dài hạn cho VĐV.",
                },
            ],
            certificates: ["Chứng chỉ Chuyên gia Dinh dưỡng (CNS)", "Chứng chỉ Dinh dưỡng thể thao"],
        },
    ];

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="coach-about">
            <Container fluid>
                <Heading title="Huấn huyện viên" breadcrumbs={[{ path: "/ Giới thiệu " }]}></Heading>
                <div className="list-coach" data-aos="fade-up">
                    <h2>GẶP GỠ CÁC HUẤN LUYỆN VIÊN THỂ DỤC CHUYÊN NGHIỆP CỦA GREEN GYM</h2>
                    {coach.map((item) => (
                        <CardCoach key={item.id} img={item.img} name={item.name}></CardCoach>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Coach;
