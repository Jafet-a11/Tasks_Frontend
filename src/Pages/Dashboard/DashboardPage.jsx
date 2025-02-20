import React, { useState, useEffect } from "react";
import { Button, Modal, Form, message } from "antd";
import { PieChartOutlined } from "@ant-design/icons"; // Ícono de gráfico
import styled from "styled-components"; // Para aplicar estilos personalizados
import axios from "axios"; // Para hacer la solicitud HTTP
import MainLayouts from "../../layouts/MainLayouts";
import TaskList from "../../layouts/TaskList";
import TaskForm from "../../layouts/TaskForm";

// Estilos personalizados para el botón
const CustomButton = styled(Button)`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState([]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { nameTask, category, description, deadline, status } = values;

      const taskData = {
        nameTask,
        category,
        description,
        deadline: deadline.toISOString(),
        status,
      };

      const token = localStorage.getItem("token"); // Obtener el token almacenado

      // Enviar la solicitud POST para registrar la tarea con el token
      const response = await axios.post(
        "http://localhost:5000/tasks",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar token en los headers
            "Content-Type": "application/json",
          },
        }
      );
      obtenerTasks();
      message.success(response.data.message); // Mostrar mensaje de éxito

      // Resetear el formulario y cerrar el modal
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message); // Mostrar mensaje de error
      } else {
        message.error("Error al registrar la tarea");
      }
    }
  };

  // Función para obtener las tareas del usuario
  const obtenerTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("No se encontró el token de autenticación.");
        return;
      }

      const response = await axios.get("http://localhost:5000/obtener-tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data); // Asignar las tareas obtenidas al estado
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      message.error("Error al obtener las tareas");
    }
  };

  // Llamar a la función obtenerTasks cuando el componente se monta
  useEffect(() => {
    obtenerTasks();
  }, []);

  return (
    <MainLayouts>
      <h1>Bienvenido al Dashboard</h1>
      {/* Botón con estilo personalizado */}
      <CustomButton onClick={showModal}>
        <PieChartOutlined /> Agregar Tarea
      </CustomButton>
      <hr></hr>
      {/* Modal con Formulario */}
      <Modal
        title="Nueva Tarea"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <TaskForm form={form} handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>

      <TaskList tasks={tasks} />
    </MainLayouts>
  );
};

export default DashboardPage;
