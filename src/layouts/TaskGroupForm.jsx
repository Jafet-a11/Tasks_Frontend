import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";

const { Option } = Select;

const GroupFormTask = ({ form, handleGroupTask, handleCancelGroup, group }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username && Array.isArray(group)) {
      // Filtrar los grupos donde el usuario es el creador
      const userGroups = group.filter(g => g.created_by === username);
      
      // Filtrar los grupos en los que el usuario está presente en la lista de miembros
      const userGroupsWithMembers = userGroups.filter(g => g.members.includes(username));
      
      // Si el usuario pertenece a algún grupo, extraemos los miembros del primer grupo encontrado
      if (userGroupsWithMembers.length > 0) {
        setFilteredUsers(userGroupsWithMembers[0].members); // Asignamos los miembros del primer grupo
        setFilteredGroups(userGroupsWithMembers); // Filtramos los grupos
      } else {
        setFilteredUsers([]); // Si no hay coincidencias, dejar vacío
        setFilteredGroups([]); // Si no hay coincidencias, dejar vacío
      }
    }
  }, [group, username]);

  const handleSelectGroupChange = (value) => {
    const selectedGroup = filteredGroups.find(group => group.id === value);
    if (selectedGroup) {
      setFilteredUsers(selectedGroup.members); // Asignar los miembros del grupo seleccionado
      form.setFieldsValue({ assignedUser: "", assignedUserName: "" }); // Limpiar los usuarios asignados
    }
  };

  const handleSelectChange = (value) => {
    form.setFieldsValue({ assignedUser: value, assignedUserName: value });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        console.log("Datos enviados al backend:", values);
        handleGroupTask(values);
      }}
    >
      {/* Usuario que asigna la tarea */}
      <Form.Item label="Asignado por">
        <Input value={username} disabled />
      </Form.Item>

      <Form.Item
        name="nameTask"
        label="Nombre de la Tarea"
        rules={[{ required: true, message: "Ingresa el nombre de la tarea" }]} >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Categoría"
        rules={[{ required: true, message: "Selecciona una categoría" }]} >
        <Select placeholder="Selecciona una categoría">
          <Option value="Trabajo">Trabajo</Option>
          <Option value="Personal">Personal</Option>
          <Option value="Estudio">Estudio</Option>
        </Select>
      </Form.Item>

      <Form.Item name="deadline" label="Fecha y Hora límite">
        <DatePicker
          style={{ width: "100%" }}
          format="YYYY-MM-DD HH:mm"
          showTime={{ format: "HH:mm" }}
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Descripción"
        rules={[{ required: true, message: "Ingresa una descripción" }]} >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        name="status"
        label="Estado"
        rules={[{ required: true, message: "Selecciona el estado de la tarea" }]} >
        <Select placeholder="Selecciona un estado">
          <Option value="Deshecho">Deshecho</Option>
          <Option value="Pausada">Pausada</Option>
          <Option value="En Progreso">En Progreso</Option>
          <Option value="Completado">Completado</Option>
        </Select>
      </Form.Item>

      {/* Selección de Grupo */}
      <Form.Item
        name="group"
        label="Seleccionar Grupo"
        rules={[{ required: true, message: "Selecciona un grupo" }]} >
        <Select
          placeholder="Selecciona un grupo"
          onChange={handleSelectGroupChange}
          options={filteredGroups.map(group => ({
            value: group.id, // ID del grupo como valor
            label: group.nameGroup, // Nombre del grupo como etiqueta
          }))} />
      </Form.Item>

      {/* Asignar Usuario */}
      <Form.Item
        name="assignedUser"
        label="Asignar Usuario"
        rules={[{ required: true, message: "Selecciona un usuario" }]} >
        <Select
          placeholder="Selecciona un usuario"
          onChange={handleSelectChange}
          options={filteredUsers.map(user => ({
            value: user, // El nombre de usuario es el value
            label: user, // También es el label
          }))} />
      </Form.Item>

      {/* Campo oculto para enviar el nombre del usuario asignado */}
      <Form.Item name="assignedUserName" style={{ display: "none" }}>
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Guardar
      </Button>
      <Button onClick={handleCancelGroup} style={{ marginLeft: 8 }}>
        Cancelar
      </Button>
    </Form>
  );
};

export default GroupFormTask;
