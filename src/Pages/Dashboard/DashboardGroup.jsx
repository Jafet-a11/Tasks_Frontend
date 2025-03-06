import React, { useState, useEffect } from "react";
import { Modal, Form, message, FloatButton, Tabs, Select } from "antd";
import { PieChartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import axios from "axios";
import TaskList from "../../layouts/TaskList";
import TaskForm from "../../layouts/TaskForm";
import GroupForm from "../../layouts/GroupForm";
import GroupFormTask from "../../layouts/TaskGroupForm";
import TaskListGroup from "../../layouts/TaskListGroup";
import StatusForm from "../../layouts/FormStatus";
import moment from "moment";
import { API } from "../../api";

const DashboardGroup = () => {
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
  const [groups, setGroups] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupeTasks, setGroupedTasks] = useState({ Deshecho: [], Pausada: [], "En Progreso": [], Completado: [], });
  const [userGroups, setUserGroups] = useState([]);
  const[creador, setCreador]=useState(null);
  const userRole = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { Option } = Select;
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
    console.log(task);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/obtener-usuarios`, { headers: { Authorization: `Bearer ${token}` }, });
      if (Array.isArray(response.data)) {
        setUsers(response.data);
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
      const response = await axios.get(`${API}/obtener-groups`, { headers: { Authorization: `Bearer ${token}` }, });
      if (Array.isArray(response.data)) {
        const filteredGroups = response.data.filter(group => group.members.includes(username));
        setUserGroups(filteredGroups);
        console.log(filteredGroups);
        filteredGroups.forEach(group => {
          localStorage.setItem(`created_by_${group.id}`, group.created_by);
        });
        setGroups(response.data);
      } else {
        setGroups([]); // Si no es un array, asignar un array vacío
        message.error("Los datos no son un array.");
      }
    } catch (error) {
      message.error("Error al obtener los usuarios");
      setGroups([]); // Asignar un array vacío en caso de error
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { nameTask, category, description, status } = values;
      const token = localStorage.getItem("token");
      let formattedDeadline = values.newDeadline ? values.newDeadline.toISOString() : editingTask?.deadline?._seconds ? new Date(editingTask.deadline._seconds * 1000).toISOString() : null;
      const taskData = { nameTask, category, description, deadline: formattedDeadline, status, };
      if (editingTask) {
        await axios.post(`${API}/editarTarea`,
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
        await axios.post(`${API}/tasks`, taskData, {
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
    const deadlineDate = task.deadline ? moment(new Date(task.deadline._seconds * 1000), "YYYY-MM-DD HH:mm:ss") : null;
    form.setFieldsValue({
      ...task,
      deadline: deadlineDate,
    });
    setIsModalOpen(true);
  };

  const handleGroupTask = async () => {
    try {
      const values = await groupFormTask.validateFields();
      const { nameTask, category, description, deadline, status, assignedUser, group } = values;
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const formattedDeadline = deadline ? new Date(deadline).toISOString() : null;
      const taskData = { nameTask, category, description, deadline: formattedDeadline, status, assignedUser, username, group };
        await axios.post(`${API}/tasksGroup`, taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        obtenerTasksGroup(selectedGroup);
        message.success("Tarea creada correctamente");
      
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
      const response = await axios.get(`${API}/obtener-tasks`, { headers: { Authorization: `Bearer ${token}` }, });
      setTasks(response.data);
    } catch (error) {
      message.error("Error al obtener las tareas");
    }
  };


  const obtenerTasksGroup = async (groupId) => {
    if (!groupId) {
      message.warning("Selecciona un grupo primero");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/obtener-tasks-group/${groupId}`, { headers: { Authorization: `Bearer ${token}` }, });
      const tasks = response.data;
      const grouped = tasks.reduce((acc, task) => {
        const status = task.status || "Deshecho";
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(task);
        return acc;
      }, {});
      setGroupedTasks(grouped);
    } catch (error) {
      message.error("Error al obtener las tareas");
    }
  };

  const handleUpdateStatus = async (taskId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/updateTaskStatus/${taskId}`,
        { status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      closeModal();
      message.success("Estado actualizado con éxito");
      obtenerTasksGroup(selectedGroup);
      
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
      await axios.delete(`${API}/eliminar-task/${taskToDelete}`, { headers: { Authorization: `Bearer ${token}` }, });
      message.success("Tarea eliminada correctamente");
      obtenerTasks();
      obtenerTasksGroup(selectedGroup);
      setIsDeleteModalOpen(false);
    } catch (error) {
      message.error("Error al eliminar la tarea");
      setIsDeleteModalOpen(false);
    }
  };

  const handleGroupOk = async (values) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/crear-grupo`,
        {
          nameGroup: values.nameGroup,
          members: values.members || [],
        },
        { headers: { Authorization: `Bearer ${token}` }, } );
      obtenerGroup();
      obtenerUsuarios();
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
  }, []);

  const obtenerCreadorGrupo = (groupId) => {
    const creadorGrupo = localStorage.getItem(`created_by_${groupId}`) || "Desconocido";
    setCreador(creadorGrupo);
  };

  return (
    <>
      <Modal title={editingTask ? "Editar Tarea" : "Nueva Tarea"} open={isModalOpen} onCancel={handleCancel} footer={null} style={{ top: 20 }}>
        <TaskForm form={form} handleOk={handleOk} handleCancel={handleCancel} editingTask={editingTask} />
      </Modal>

      <Modal title="Confirmar Eliminación" open={isDeleteModalOpen} onCancel={handleDeleteCancel} onOk={eliminarTasks} okText="Eliminar" cancelText="Cancelar" okButtonProps={{ danger: true }} >
        <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
      </Modal>

      <Modal title="Nuevo Grupo" open={isGroupModalOpen} onCancel={handleGroupCancel} footer={null} style={{ top: 20 }} >
        <GroupForm form={groupForm} handleGroupOk={handleGroupOk} handleCancel={handleGroupCancel} users={users} />
      </Modal>

      <Modal title={editingTask ? "Editar Tarea" : "Nueva Tarea"} open={isModalOpenGroup} onCancel={handleCancelGroup} footer={null} style={{ top: 20 }} >
        <GroupFormTask form={groupFormTask} handleGroupTask={handleGroupTask} handleCancelGroup={handleCancelGroup} users={users} group={groups} />
      </Modal>
      <Modal title="Actualizar Estado de la Tarea" open={isModalVisible} onCancel={closeModal} footer={null} >
        {selectedTask && (
          <StatusForm tasks={[selectedTask]} selectedGroup={selectedGroup} handleUpdateStatus={handleUpdateStatus} />
        )}
      </Modal>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Tareas Individuales" key="individual">
          <TaskList tasks={tasks} onEdit={handleEdit} onDelete={showDeleteModal} />
          <FloatButton icon={<PieChartOutlined />} onClick={showModal} tooltip="Agregar Tarea" type="primary" style={{ right: 24, bottom: 24 }} />
        </Tabs.TabPane>
        {Array.isArray(userGroups) && userGroups.length !== 0 && (
          <Tabs.TabPane tab="Tareas de Grupo" key="group">
            <Select placeholder="Selecciona un grupo" style={{ width: 200, marginBottom: 16 }} onChange={(value) => { setSelectedGroup(value); obtenerTasksGroup(value); obtenerCreadorGrupo(value)}} >
              {userGroups.map((group) => (
                <Option key={group.id} value={group.id}> {group.nameGroup} </Option> ))}
            </Select>
            <TaskListGroup groupeTasks={groupeTasks} openModal={openModal} onDelete={showDeleteModal} handleUpdateStatus={handleUpdateStatus} />
            {userRole !== "1" && (
              <FloatButton icon={<UsergroupAddOutlined />} onClick={showGroupModal} tooltip="Agregar Grupo" type="primary" style={{ right: 80, bottom: 24 }} />
            )}
            {/* Botón para agregar tarea */}
            {username === creador && (
              <FloatButton icon={<PieChartOutlined />} onClick={showModalGroup} tooltip="Agregar Tarea" type="primary" style={{ right: 24, bottom: 24 }} />
            )}
          </Tabs.TabPane>
        )}
      </Tabs>
    </>
  );
};
export default DashboardGroup;