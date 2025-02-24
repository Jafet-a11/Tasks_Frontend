import React, { useState, useEffect } from "react";
import { Modal, Form, message, FloatButton, Tabs } from "antd";
import { PieChartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import axios from "axios";
import MainLayouts from "../../layouts/MainLayouts";
import TaskList from "../../layouts/TaskList";
import TaskForm from "../../layouts/TaskForm";
import GroupForm from "../../layouts/GroupForm";
import GroupFormTask from "../../layouts/TaskGroupForm";
import TaskListGroup from "../../layouts/TaskListGroup";
import StatusForm from "../../layouts/FormStatus";
import moment from "moment";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [groupTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("individual");
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groupForm] = Form.useForm();
  const [groupFormTask] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [, setGroups] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupeTasks, setGroupedTasks] = useState({
    Deshecho: [],
    Pausada: [],
    "En Progreso": [],
    Completado: [],
  });
  const userRole = localStorage.getItem("role");
  const userGroupId = localStorage.getItem("group_id");
  const showModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const showModalGroup = () => {
    setEditingTask(null);
    setIsModalOpenGroup(true);
  };

  const handleCancelGroup = () => {
    setIsModalOpenGroup(false);
    form.resetFields();
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };
  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/obtener-usuarios",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Verificar que response.data es un array
      if (Array.isArray(response.data)) {
        setUsers(response.data);
        console.log(response.data);
      } else {
        setUsers([]); // Si no es un array, asignar un array vacío
        message.error("Los datos no son un array.");
      }
    } catch (error) {
      message.error("Error al obtener los usuarios");
      setUsers([]); // Asignar un array vacío en caso de error
    }
  };

  const obtenerGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/obtener-groups", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Verificar que response.data es un array
      if (Array.isArray(response.data)) {
        setGroups(response.data);
      } else {
        setGroups([]); // Si no es un array, asignar un array vacío
        message.error("Los datos no son un array.");
      }
    } catch (error) {
      message.error("Error al obtener los usuarios");
      setGroups([]); // Asignar un array vacío en caso de error
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { nameTask, category, description, deadline, status } = values;
      const token = localStorage.getItem("token");
      const formattedDeadline = deadline
        ? new Date(deadline).toISOString()
        : null;

      const taskData = {
        nameTask,
        category,
        description,
        deadline: formattedDeadline,
        status,
      };

      if (editingTask) {
        await axios.post(
          "http://localhost:5000/editarTarea",
          { id: editingTask.id, ...taskData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        message.success("Tarea actualizada correctamente");
      } else {
        await axios.post("http://localhost:5000/tasks", taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        message.success("Tarea creada correctamente");
      }

      obtenerTasks();
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al procesar la tarea:", error);
      message.error("Error al procesar la tarea");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    const deadlineDate = task.deadline
      ? moment(new Date(task.deadline._seconds * 1000), "YYYY-MM-DD HH:mm:ss")
      : null;
    form.setFieldsValue({
      ...task,
      deadline: deadlineDate,
    });
    setIsModalOpen(true);
  };

  const handleGroupTask = async () => {
    try {
      const values = await groupFormTask.validateFields();
      const {
        nameTask,
        category,
        description,
        deadline,
        status,
        assignedUser,
      } = values;
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const formattedDeadline = deadline
        ? new Date(deadline).toISOString()
        : null;

      const taskData = {
        nameTask,
        category,
        description,
        deadline: formattedDeadline,
        status,
        assignedUser,
        username, // Agregar el usuario asignado
      };
      console.log(taskData);
      // Aquí manejas si estás editando o creando la tarea
      if (editingTask) {
        await axios.post(
          "http://localhost:5000/editarTareaGroup",
          { id: editingTask.id, ...taskData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        obtenerTasksGroup();
        message.success("Tarea actualizada correctamente");
      } else {
        await axios.post("http://localhost:5000/tasksGroup", taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        obtenerTasksGroup();
        message.success("Tarea creada correctamente");
      }

      groupFormTask.resetFields();
      setIsModalOpenGroup(false);
    } catch (error) {
      console.error("Error al procesar la tarea:", error);
      message.error("Error al procesar la tarea");
    }
  };

  const obtenerTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/obtener-tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      message.error("Error al obtener las tareas");
    }
  };
  
  const obtenerTasksGroup = async () => {
    const group_id = localStorage.getItem("group_id");

    if (!group_id) {
      message.error("No tienes un grupo asignado.");
      return; // Detenemos la ejecución de la función
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/obtener-tasks-group",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const tasks = response.data;

      // Agrupar las tareas por su estado
      const grouped = tasks.reduce((acc, task) => {
        const status = task.status || "Deshecho"; // Usar un estado predeterminado si no tiene estado
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(task);
        return acc;
      }, {});

      setGroupedTasks(grouped); // Actualiza el estado con las tareas agrupadas
      console.log(grouped); // Verifica si las tareas están agrupadas correctamente
    } catch (error) {
      message.error("Error al obtener las tareas");
    }
  };

  const handleUpdateStatus = async (taskId, status) => {
    console.log("Status recibido en handleUpdateStatus:", status);
    try {
      console.log("estatus", status);
      if (!status) {
        console.error("El campo 'status' es requerido");
        message.error("El campo 'status' es requerido");
        return; // Detiene la ejecución si 'status' está vacío
      }

      console.log("taskId:", taskId, "newStatus:", status); // Verifica los valores

      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/updateTaskStatus/${taskId}`,
        { status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("Estado actualizado con éxito");

      // Volver a obtener las tareas después de actualizar el estado
      obtenerTasksGroup();
    } catch (error) {
      message.error("Error al actualizar el estado de la tarea");
      console.error(
        "Error en la petición:",
        error.response ? error.response.data : error
      );
    }
  };

  const eliminarTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/eliminar-task/${taskToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Tarea eliminada correctamente");
      obtenerTasks();
      setIsDeleteModalOpen(false);
    } catch (error) {
      message.error("Error al eliminar la tarea");
      setIsDeleteModalOpen(false);
    }
  };

  const handleGroupOk = async (values) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/crear-grupo",
        {
          nameGroup: values.nameGroup,
          members: values.members || [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      message.success("Grupo creado exitosamente");
      groupForm.resetFields();
      setIsGroupModalOpen(false);
    } catch (error) {
      console.error("Error al registrar el grupo:", error);
      message.error("Error al registrar el grupo");
    }
  };

  const showDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showGroupModal = () => {
    setIsGroupModalOpen(true);
  };

  const handleGroupCancel = () => {
    setIsGroupModalOpen(false);
    groupForm.resetFields();
  };

  groupTasks.forEach((task) => {
    if (task.status) {
      groupeTasks[task.status].push(task);
    }
  });

  useEffect(() => {
    obtenerUsuarios();
    obtenerTasks();
    obtenerGroup();
    obtenerTasksGroup();
  }, []);

  return (
    <MainLayouts>
      <h1>Bienvenido al Dashboard</h1>

      <Modal
        title={editingTask ? "Editar Tarea" : "Nueva Tarea"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 20 }}
      >
        <TaskForm form={form} handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>

      <Modal
        title="Confirmar Eliminación"
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onOk={eliminarTasks}
        okText="Eliminar"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
      >
        <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
      </Modal>
      <Modal
        title="Nuevo Grupo"
        open={isGroupModalOpen}
        onCancel={handleGroupCancel}
        footer={null}
        style={{ top: 20 }}
      >
        <GroupForm
          form={groupForm}
          handleGroupOk={handleGroupOk}
          handleCancel={handleGroupCancel}
          users={users} // Aquí se pasan los usuarios al formulario
        />
      </Modal>

      <Modal
        title={editingTask ? "Editar Tarea" : "Nueva Tarea"}
        open={isModalOpenGroup}
        onCancel={handleCancelGroup}
        footer={null}
        style={{ top: 20 }}
      >
        <GroupFormTask
          form={groupFormTask}
          handleGroupTask={handleGroupTask}
          handleCancelGroup={handleCancelGroup}
          users={users}
        />
      </Modal>
      <Modal
        title="Actualizar Estado de la Tarea"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedTask && (
          <StatusForm
          tasks={[selectedTask]}
          userGroupId={userGroupId}
          handleUpdateStatus={handleUpdateStatus} // Pasa directamente
        />
        )}
      </Modal>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Tareas Individuales" key="individual">
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={showDeleteModal}
          />
          <FloatButton
            icon={<PieChartOutlined />}
            onClick={showModal}
            tooltip="Agregar Tarea"
            type="primary"
            style={{ right: 24, bottom: 24 }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tareas de Grupo" key="group">
          <TaskListGroup
            groupeTasks={groupeTasks}
            openModal={openModal}
            handleUpdateStatus={handleUpdateStatus}
          />

          {userRole !== "1" && (
            <FloatButton
              icon={<UsergroupAddOutlined />}
              onClick={showGroupModal}
              tooltip="Agregar Grupo"
              type="primary"
              style={{ right: 80, bottom: 24 }}
            />
          )}

          {/* Botón para agregar tarea */}
          {userRole !== "1" && (
            <FloatButton
              icon={<PieChartOutlined />}
              onClick={showModalGroup}
              tooltip="Agregar Tarea"
              type="primary"
              style={{ right: 24, bottom: 24 }}
            />
          )}
        </Tabs.TabPane>
      </Tabs>
    </MainLayouts>
  );
};

export default DashboardPage;
