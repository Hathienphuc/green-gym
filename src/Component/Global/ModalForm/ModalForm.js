import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ModalForm.css";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";
import md5 from "md5";
import { toast } from "react-toastify";
import { useLogin } from "../../Context/Login/LoginContext";
import Select from "react-select";

const ModalForm = ({ show, handleClose, mode: initialMode = "login", userData }) => {
    const [mode, setMode] = useState(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { handleLogin } = useLogin();
    const account = "https://68793e0c63f24f1fdca16f7c.mockapi.io/user";

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    const schema = {
        login: Yup.object({
            username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
            password: Yup.string().required("Vui lòng nhập mật khẩu"),
        }),
        register: Yup.object({
            fullname: Yup.string().required("Vui lòng nhập họ tên"),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, "Số điện thoại phải đủ 10 chữ số")
                .required("Vui lòng nhập số điện thoại"),
            email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
            username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
            password: Yup.string().min(6, "Tối thiểu 6 ký tự").required("Vui lòng nhập mật khẩu"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
                .required("Vui lòng xác nhận mật khẩu"),
        }),
        update: Yup.object({
            fullname: Yup.string().required("Vui lòng nhập họ tên"),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, "Số điện thoại phải đủ 10 chữ số")
                .required("Vui lòng nhập số điện thoại"),
            email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
            gender: Yup.string().required("Vui lòng chọn giới tính"),
        }),
        changePassword: Yup.object({
            oldPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
            newPassword: Yup.string().min(6, "Tối thiểu 6 ký tự").required("Vui lòng nhập mật khẩu mới"),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
                .required("Vui lòng xác nhận mật khẩu mới"),
        }),
    };

    const initialValues = {
        fullname: userData?.fullname || "",
        phone: userData?.phone || "",
        email: userData?.email || "",
        username: userData?.username || "",
        password: "",
        confirmPassword: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        gender: userData?.gender || null,
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (mode === "login") {
                const res = await fetch(`${account}?username=${values.username}`);
                const users = await res.json();
                if (!Array.isArray(users) || users.length === 0) return toast.error("Tài khoản không tồn tại", { position: "top-center" });
                if (users[0].password !== md5(values.password)) return toast.error("Sai mật khẩu", { position: "top-center" });
                handleLogin(users[0]);
                toast.success("Đăng nhập thành công!", {
                    onClose: handleClose,
                    position: "top-center",
                    autoClose: 2000,
                });
            }

            if (mode === "register") {
                const checkRes = await fetch(`${account}?username=${values.username}`);
                const exists = await checkRes.json();
                if (exists.length > 0) return toast.error("Tên đăng nhập đã tồn tại", { position: "top-center" });
                const newUser = {
                    username: values.username,
                    password: md5(values.password),
                    fullname: values.fullname,
                    email: values.email,
                    phone: values.phone,
                    avatar: `https://i.pravatar.cc/150?u=${values.username}`,
                };
                const res = await fetch(account, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUser),
                });
                if (!res.ok) return toast.error("Đăng ký thất bại!", { position: "top-center" });
                toast.success("Đăng ký thành công", {
                    position: "top-center",
                    autoClose: 2000,
                });
                setMode("login");
            }

            if (mode === "update") {
                const updatedUser = {
                    ...userData,
                    fullname: values.fullname,
                    email: values.email,
                    phone: values.phone,
                    gender: values.gender,
                };
                const res = await fetch(`${account}/${userData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedUser),
                });
                if (!res.ok) return toast.error("Cập nhật thất bại!", { position: "top-center" });
                handleLogin(updatedUser);
                toast.success("Cập nhật thành công!", { position: "top-center", autoClose: 2000 });
                handleClose();
            }

            if (mode === "changePassword") {
                if (md5(values.oldPassword) !== userData.password) return toast.error("Mật khẩu hiện tại không đúng", { position: "top-center" });
                const updatedUser = { ...userData, password: md5(values.newPassword) };
                const res = await fetch(`${account}/${userData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedUser),
                });
                if (!res.ok) return toast.error("Đổi mật khẩu thất bại!", { position: "top-center" });
                handleLogin(updatedUser);
                toast.success("Đổi mật khẩu thành công!", { position: "top-center", autoClose: 2000 });
                handleClose();
            }
        } catch (err) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại", { position: "top-center" });
        }
        setSubmitting(false);
    };

    const renderFields = ({ values, setFieldValue, setFieldTouched }) => {
        switch (mode) {
            case "register":
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ tên</Form.Label>
                            <Field name="fullname" className="form-control" placeholder="Nhập họ tên" />
                            <ErrorMessage name="fullname" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Field name="phone" type="tel" className="form-control" placeholder="Nhập số điện thoại" />
                            <ErrorMessage name="phone" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Field name="email" type="email" className="form-control" placeholder="Nhập email" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Field name="username" className="form-control" placeholder="Nhập tên đăng nhập" />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <div className="pass">
                                <Field type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Nhập mật khẩu" />
                                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} onClick={() => setShowPassword((prev) => !prev)}></i>
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <div className="pass">
                                <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="form-control" placeholder="Xác nhận mật khẩu" />
                                <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`} onClick={() => setShowConfirmPassword((prev) => !prev)}></i>
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                        </Form.Group>
                    </>
                );

            case "login":
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Field name="username" className="form-control" placeholder="Nhập tên đăng nhập" />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <div className="pass">
                                <Field type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Nhập mật khẩu" />
                                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} onClick={() => setShowPassword((prev) => !prev)}></i>
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </Form.Group>
                    </>
                );

            case "update":
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ tên</Form.Label>
                            <Field name="fullname" className="form-control" placeholder="Nhập họ tên" />
                            <ErrorMessage name="fullname" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Field name="phone" className="form-control" placeholder="Nhập số điện thoại" />
                            <ErrorMessage name="phone" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Field name="email" className="form-control" placeholder="Nhập email" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Giới tính</Form.Label>
                            <Select
                                options={[
                                    { value: "Nam", label: "Nam" },
                                    { value: "Nữ", label: "Nữ" },
                                    { value: "Khác", label: "Khác" },
                                ]}
                                placeholder="Chọn giới tính"
                                classNamePrefix="select-gender"
                                value={values.gender ? { value: values.gender, label: values.gender === "Nam" ? "Nam" : values.gender === "Nữ" ? "Nữ" : "Khác" } : null}
                                onChange={(val) => setFieldValue("gender", val.value)}
                                onBlur={() => setFieldTouched("gender", true)}
                            />
                            <ErrorMessage name="gender" component="div" className="text-danger" />
                        </Form.Group>
                    </>
                );

            case "changePassword":
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu hiện tại</Form.Label>
                            <Field type="password" name="oldPassword" className="form-control" placeholder="Nhập mật khẩu hiện tại" />
                            <ErrorMessage name="oldPassword" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Field type="password" name="newPassword" className="form-control" placeholder="Nhập mật khẩu mới" />
                            <ErrorMessage name="newPassword" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                            <Field type="password" name="confirmNewPassword" className="form-control" placeholder="Xác nhận mật khẩu mới" />
                            <ErrorMessage name="confirmNewPassword" component="div" className="text-danger" />
                        </Form.Group>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "login" && "Đăng nhập"}
                    {mode === "register" && "Đăng ký"}
                    {mode === "update" && "Cập nhật tài khoản"}
                    {mode === "changePassword" && "Đổi mật khẩu"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialValues} validationSchema={schema[mode]} onSubmit={handleSubmit} enableReinitialize>
                    {(formikProps) => (
                        <FormikForm>
                            {renderFields(formikProps)}
                            <Button type="submit" disabled={formikProps.isSubmitting} className="btn.btn-primary">
                                {mode === "login" && "Đăng nhập"}
                                {mode === "register" && "Đăng ký"}
                                {mode === "update" && "Cập nhật"}
                                {mode === "changePassword" && "Đổi mật khẩu"}
                            </Button>
                        </FormikForm>
                    )}
                </Formik>

                {(mode === "login" || mode === "register") && (
                    <div className="text-center mt-3">
                        {mode === "login" ? (
                            <p>
                                Chưa có tài khoản? <span onClick={() => setMode("register")}>Đăng ký ngay</span>
                            </p>
                        ) : (
                            <p>
                                Đã có tài khoản? <span onClick={() => setMode("login")}>Đăng nhập</span>
                            </p>
                        )}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ModalForm;
