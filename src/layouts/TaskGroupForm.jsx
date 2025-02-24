import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";

const { Option } = Select;

const GroupFormTask = ({ form, handleGroupTask, handleCancelGroup, users }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const username = localStorage.getItem("username");
  const userGroupId = localStorage.getItem("group_id"); // Obtenemos el group_id del usuario

  useEffect(() => {
    // Verifica si userGroupId está presente y usuarios está definido
    console.log('User Group ID:', userGroupId);
    console.log('Users:', users);
  
    if (userGroupId && users && users.length > 0) {
      // Convertimos ambos valores a números para asegurar la comparación correcta
      const groupUsers = users.filter(user => Number(user.group_id) === Number(userGroupId));
      console.log('Usuarios filtrados:', groupUsers);
      setFilteredUsers(groupUsers);
    }
  }, [users, userGroupId]);
  

  const handleSelectChange = (value) => {
    const selected = filteredUsers.find((user) => user.id === value);
    form.setFieldsValue({ assignedUser: value, assignedUserName: selected?.username || "" });
  };

  if (!filteredUsers || filteredUsers.length === 0) {
    return <p>No hay usuarios en el mismo grupo o no estas en un grupo.</p>;
  }

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

      <Form.Item
        name="assignedUser"
        label="Asignar Usuario"
        rules={[{ required: true, message: "Selecciona un usuario" }]} >
        <Select
          placeholder="Selecciona un usuario"
          onChange={handleSelectChange}
          options={filteredUsers.map((user) => ({
            value: user.id,
            label: user.username,
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
