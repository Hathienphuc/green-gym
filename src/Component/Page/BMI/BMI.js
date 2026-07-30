import React, { useState } from "react";
import "./BMI.css";
import { Container, Modal } from "react-bootstrap";
import Icon from "../../Global/Icon/Icon";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../Global/Button/Button";
import Heading from "../../Global/Heading/Heading";
import Select from "react-select";
import useAOS from "../../Customhooks/AOS/useAOS";

const BMI = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [result, setResult] = useState(null);
    const genderOptions = [
        { value: "male", label: "Nam" },
        { value: "female", label: "Nữ" },
    ];

    const calculateBMI = (weight, height) => {
        const heightM = height / 100;
        return (weight / (heightM * heightM)).toFixed(2);
    };

    const getBMIStatus = (bmi) => {
        if (bmi < 18.5) return "Gầy";
        if (bmi < 24.9) return "Bình thường";
        if (bmi < 29.9) return "Thừa cân";
        return "Béo phì";
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Vui lòng nhập họ tên"),
        phone: Yup.string()
            .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ")
            .required("Vui lòng nhập số điện thoại"),
        age: Yup.number().typeError("Tuổi phải là số").min(1, "Tuổi không hợp lệ").max(120, "Tuổi quá lớn").required("Vui lòng nhập tuổi"),
        gender: Yup.string().required("Vui lòng chọn giới tính"),
        weight: Yup.number().typeError("Cân nặng phải là số").positive("Cân nặng phải lớn hơn 0").required("Vui lòng nhập cân nặng"),
        height: Yup.number().typeError("Chiều cao phải là số").positive("Chiều cao phải lớn hơn 0").required("Vui lòng nhập chiều cao"),
    });

    useAOS({
        duration: 1000,
        easing: "linear",
        once: false,
        mirror: true,
    });

    return (
        <div className="bmi">
            <Container fluid className="container-bmi">
                <Heading title="BMI" breadcrumbs={[{ path: "/ Dịch vụ " }]}></Heading>
                <div className="bmi-content" data-aos="fade-up">
                    <Icon></Icon>
                    <h2>TÍNH BMI CỦA BẠN NGAY BÂY GIỜ!!</h2>
                    <p className="bmi-info">
                        Đo chỉ số BMI tại Green Gym để đánh giá mức độ béo, gầy hay cân nặng lý tưởng của bạn. <br />
                        Hãy để lại thông tin để Green Gym có thể giúp bạn phân tích sức khỏe và <br />
                        đưa ra những tư vấn phù hợp với thể trạng của bạn.
                    </p>
                    <Formik
                        initialValues={{
                            name: "",
                            phone: "",
                            age: "",
                            gender: "",
                            weight: "",
                            height: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            const bmi = calculateBMI(values.weight, values.height);
                            const status = getBMIStatus(bmi);
                            setResult({ ...values, bmi, status });
                            handleShow();
                        }}
                    >
                        {({ setFieldValue, setFieldTouched }) => (
                            <Form>
                                <div className="input-bmi">
                                    <div className="bmi-field">
                                        <label>Họ tên</label>
                                        <Field type="text" name="name" placeholder="Nhập họ tên" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>
                                    <div className="bmi-field">
                                        <label>Số điện thoại</label>
                                        <Field type="tel" inputMode="numeric" name="phone" placeholder="Nhập số điện thoại" />
                                        <ErrorMessage name="phone" component="div" className="text-danger" />
                                    </div>
                                </div>
                                <div className="input-bmi">
                                    <div className="bmi-field">
                                        <label>Tuổi</label>
                                        <Field type="text" name="age" placeholder="Nhập tuổi" />
                                        <ErrorMessage name="age" component="div" className="text-danger" />
                                    </div>
                                    <div className="sex">
                                        <label>Giới tính</label>
                                        <Select
                                            placeholder="Chọn giới tính"
                                            classNamePrefix="select-sex"
                                            options={genderOptions}
                                            onChange={(option) => setFieldValue("gender", option ? option.value : "")}
                                            onBlur={() => setFieldTouched("gender", true)}
                                        />
                                        <ErrorMessage name="gender" component="div" className="text-danger" />
                                    </div>
                                </div>
                                <div className="input-bmi">
                                    <div className="bmi-field">
                                        <label>Cân nặng</label>
                                        <Field type="text" name="weight" placeholder="Cân nặng / kg" />
                                        <ErrorMessage name="weight" component="div" className="text-danger" />
                                    </div>
                                    <div className="bmi-field">
                                        <label>Chiều cao</label>
                                        <Field type="text" name="height" placeholder="Chiều cao / cm" />
                                        <ErrorMessage name="height" component="div" className="text-danger" />
                                    </div>
                                </div>
                                <Button text="Nhận kết quả" onClick={handleShow}></Button>
                            </Form>
                        )}
                    </Formik>
                    <img src="/Image/bmi.png" alt="" />
                </div>

                <Modal show={show} onHide={handleClose} animation={false} dialogClassName="bmi-modal" contentClassName="bmi-modal-content">
                    <Modal.Header closeButton>
                        <Modal.Title>Kết quả đo BMI</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {result ? (
                            <div>
                                <p>
                                    <strong>Họ tên:</strong> {result.name}
                                </p>
                                <p>
                                    <strong>Tuổi:</strong> {result.age}
                                </p>
                                <p>
                                    <strong>Giới tính:</strong> {result.gender === "male" ? "Nam" : "Nữ"}
                                </p>
                                <p>
                                    <strong>Cân nặng:</strong> {result.weight} kg
                                </p>
                                <p>
                                    <strong>Chiều cao:</strong> {result.height} cm
                                </p>
                                <hr />
                                <p>
                                    <strong>Chỉ số BMI:</strong> {result.bmi}
                                </p>
                                <p>
                                    <strong>Phân loại:</strong> <span>{result.status}</span>
                                </p>
                            </div>
                        ) : (
                            <p className="error-bmi">Không có dữ liệu!</p>
                        )}
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default BMI;
