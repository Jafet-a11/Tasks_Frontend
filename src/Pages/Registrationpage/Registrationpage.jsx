import React, { useState, useEffect } from "react";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { API } from "../../api";
import '../../App.css';
function Registrationpage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("group_id");
    localStorage.removeItem("role");
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    if (Object.values(errors).some((error) => error)) {
      message.error("Por favor, corrija los errores en el formulario");
      return;
    }

    try {
      const response = await axios.post(
        `${API}/registro`,
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        message.success("Datos registrados correctamente");
        navigate("/Pages/LoginPage/LoginPage");
      }else{
        message.error("Usuario o correo ya están registradosor");
      }
    } catch (error) {
      message.error("Usuario o correo ya están registrados");
    }
  };

  const validar = () => {
    const newErrors = {};
    if (validator.isEmpty(formData.username)) newErrors.username = "El usuario es obligatorio.";
    if (!validator.isEmail(formData.email)) newErrors.email = "El correo no es válido.";
    if (!validator.isLength(formData.password, { min: 8, max: 8 })) {
      newErrors.password = "Debe tener exactamente 8 caracteres.";
    } else if (!/[a-zA-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
      newErrors.password = "Debe contener al menos una letra y un número.";
    }
    setErrors(newErrors);
  };

 useEffect(() => {
          logout();
      }, []);
  
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
         background:"white",
      }}
    >
      <h2>Registro</h2>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Usuario" validateStatus={errors.username ? "error" : "success"} help={errors.username}>
          <Input
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value.slice(0, 10) })}
            onBlur={validar}
          />
        </Form.Item>

        <Form.Item label="Correo" validateStatus={errors.email ? "error" : "success"} help={errors.email}>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={validar}
          />
        </Form.Item>

        <Form.Item label="Contraseña" validateStatus={errors.password ? "error" : "success"} help={errors.password}>
          <Input.Password
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            onBlur={validar}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Registrarse</Button>
          <Button type="link" onClick={() => navigate("/Pages/LoginPage/LoginPage")}>
             Iniciar sesion
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Registrationpage;
