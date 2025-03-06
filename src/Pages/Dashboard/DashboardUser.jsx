import { useState, useEffect } from "react";
import axios from "axios";
import { Table, message, Button, Space, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MainLayouts from "../../layouts/MainLayouts";
import UserForm from "../../layouts/UserForm"
import { API } from "../../api";

const DashboardUser = () => {
  const [users, setUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [groups, setGroups] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/obtener-usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]);
        message.error("Los datos no son un array.");
      }
    } catch (error) {
      message.error("Error al obtener los usuarios");
      setUsers([]);
    }
  };

  const eliminarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${API}/eliminar-usuario/${taskToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      message.success("Usuario eliminada correctamente");
      obtenerUsuarios();
      setIsDeleteModalOpen(false);
    } catch (error) {
      message.error("Error al eliminar la usuario");
      setIsDeleteModalOpen(false);
    }
  };
  const showDeleteModal = (userId) => {
    setTaskToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };


  const hideEditModal = () => {
    setIsEditModalVisible(false);

  };

  const handleUpdateUser = async (values) => {
    console.log(values);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API}/actualizar-usuario/${taskToDelete}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
     
      obtenerUsuarios();
      hideEditModal();
      message.success("Usuario actualizado correctamente");
    } catch (error) {
     
      message.error("Error al actualizar el usuario");
    }
  };

  const showEditModal = (userId) => {
    const userToEdit = users.find(user => user.id === userId); // Encuentra el usuario por ID
    setTaskToDelete(userId);
    setIsEditModalVisible(true);
    setUserToEdit(userToEdit); // Guarda el usuario a editar en el estado
  };

  const obtenerGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/obtener-groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Verificar que response.data es un array
      console.log(response.data);
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

  useEffect(() => {
    obtenerUsuarios();
    obtenerGroup();
  }, []);

  const columns = [
    { title: "Usuario", dataIndex: "username", key: "username" },
    { title: "Rol", dataIndex: "role", key: "role" },
    { title: "Correo Electrónico", dataIndex: "email", key: "email" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space>
          <Button
            type="warning"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record.id)}
            style={{ background: "yellow" }}
          >

          </Button>
          <Button type="danger" icon={<DeleteOutlined style={{ color: 'white' }} />} onClick={() => showDeleteModal(record.id)} style={{ background: "red" }}
          >

          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayouts>
      <h2>Lista de Usuarios</h2>
      <Table dataSource={users} columns={columns} rowKey="id" bordered pagination={{ pageSize: 5 }} />
      <UserForm
        visible={isEditModalVisible}
        onCancel={hideEditModal}
        onUpdate={handleUpdateUser}
        user={userToEdit} // Pasa el usuario a editar aquí
        group={groups}
      />

      <Modal
        title="Confirmar Eliminación"
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onOk={eliminarUsuarios}
        okText="Eliminar"
        cancelText="Cancelar"
        okButtonProps={{ danger: true }}
      >Estas seguro que deseas eliminar este usuario?</Modal>

    </MainLayouts>
  );
};

export default DashboardUser;