import React, { useEffect, useState } from "react";
import MainLayouts from "../../layouts/MainLayouts";
import { Table, message, Button, Space, Modal } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import GroupsForm from "../../layouts/GroupsForm"
import { API } from "../../api";

const DashboardGroups = () => {
    const [Groups, setGroups] = useState([]);
    const [GroupsId, setGroupsId] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [groupToEdit, setGroupToEdit] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [users, setUsers] = useState([]);

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
            const response = await axios.get(`${API}/obtener-groups`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (Array.isArray(response.data)) {
                setGroups(response.data);
            } else {
                setGroups([]); // Si no es un array, asignar un array vacío
                message.error("Los datos no son un array.");
            }
        } catch (error) {
            message.error("Error al obtener los grupos");
            setGroups([]); // Asignar un array vacío en caso de error
        }
    };
    
    const handleUpdateGrupo = async (values) => {
        console.log(values);
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${API}/actualizar-grupo/${GroupsId}`,
                values,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            obtenerGroup();
            hideEditModal();
            message.success("Grupo actualizado correctamente");
        } catch (error) {
            message.error("Error al actualizar el grupo");
        }
    };

    const eliminarGrupos = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(
                `${API}/eliminar-grupos/${GroupsId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            message.success("Grupo eliminado correctamente");
            obtenerGroup();
            setIsDeleteModalOpen(false);
        } catch (error) {
            message.error("Error al eliminar el grupo");
            setIsDeleteModalOpen(false);
        }
    };

    useEffect(() => {
        obtenerGroup();
        obtenerUsuarios();
    }, []);

    const columns = [
        { title: "ID del grupo", dataIndex: "id", key: "id" },
        { title: "Nombre de grupo", dataIndex: "nameGroup", key: "nameGroup" },
        { title: "Creado por", dataIndex: "created_by", key: "created_by" },
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
                    <Button type="danger"
                        icon={<DeleteOutlined style={{ color: 'white' }} />}
                        onClick={() => showDeleteModal(record.id)}
                        style={{ background: "red" }}
                    >

                    </Button>
                </Space>
            ),
        },
    ];

    const showEditModal = (groupId) => {
        const groupToEdit = Groups.find(group => group.id === groupId); // Encuentra el usuario por ID
        setGroupsId(groupId);
        setIsEditModalVisible(true);
        setGroupToEdit(groupToEdit); // Guarda el usuario a editar en el estado
    };

    const showDeleteModal = (grupoId) => {
        setGroupsId(grupoId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const hideEditModal = () => {
        setIsEditModalVisible(false);
    };

    return (
        <MainLayouts>
            <h2>Lista de Grupos</h2>
            <Table dataSource={Groups} columns={columns} rowKey="id" bordered pagination={{ pageSize: 5 }} />
            <Modal
                title="Confirmar Eliminación"
                open={isDeleteModalOpen}
                onCancel={handleDeleteCancel}
                onOk={eliminarGrupos}
                okText="Eliminar"
                cancelText="Cancelar"
                okButtonProps={{ danger: true }}
            >Estas seguro que deseas eliminar este grupo?</Modal>
            <GroupsForm
                visible={isEditModalVisible}
                onCancel={hideEditModal}
                onUpdate={handleUpdateGrupo}
                group={groupToEdit}
                users={users}            />
        </MainLayouts>
    );
};

export default DashboardGroups;