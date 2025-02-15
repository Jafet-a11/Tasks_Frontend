import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function Login() {
  const [form] = Form.useForm(); // Hook de Ant Design para manejar el formulario
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Manejo del envío del formulario
  const handleSubmit = async (values) => {
    const { username, password } = values; // Obtiene los valores del formulario

    try {
      // Realiza la petición GET para autenticar el usuario
      const response = await axios.get(`http://localhost:5000/login`, {
        params: { username, password },
      });

      // Verifica si la respuesta es exitosa
      if (response.status === 200) {
        message.success(`Inicio de sesión exitoso, bienvenido: ${username}`);
        navigate("/Pages/Dashboard/DashboardPage");
      } else {
        message.error("Error al autenticar");
      }
    } catch (error) {
      message.error("Username o password incorrecta");
      console.error("Error de red:", error);
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value.trim();
    setUsername(newUsername);
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value.trim();
    setPassword(newPassword);
  };
  
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
         background:"white",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Campo de usuario */}
        <Form.Item
          label="Usuario"
          name="username"
          rules={[
            { required: true, message: "Debe completar este campo." },
            {
              validator: (_, value) =>
                value && value.includes(" ")
                  ? Promise.reject("El usuario no puede contener espacios.")
                  : Promise.resolve(),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Ingrese su usuario"
            value={username}
            onChange={handleUsernameChange} // Usamos la función para controlar los espacios
          />
        </Form.Item>

        {/* Campo de contraseña */}
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "Debe completar este campo." },
            {
              validator: (_, value) =>
                value && value.includes(" ")
                  ? Promise.reject("La contraseña no puede contener espacios.")
                  : Promise.resolve(),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange} // También aplicamos .trim() para password
          />
        </Form.Item>

        {/* Botón de inicio de sesión */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Iniciar Sesión
          </Button>
        </Form.Item>

        {/* Botón para registrarse */}
        <Form.Item>
          <Button
            type="default"
            block
            onClick={() => navigate("/Pages/LandingPage/LandingPage")}
          >
            Landing Page
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
