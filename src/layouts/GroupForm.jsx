import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";

const GroupForm = ({ handleGroupOk, handleCancel, users }) => {
  // Crear la instancia del formulario
  const [form] = Form.useForm();

  // Estado para los miembros seleccionados
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectChange = (value) => {
    // Actualizar el estado con los miembros seleccionados
    setSelectedUsers(value);
  };

  if (!users || users.length === 0) {
    return <p>Cargando usuarios...</p>; // Mostrar un mensaje de carga si users no está disponible
  }

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="nameGroup"
        label="Nombre del Grupo"
        rules={[{ required: true, message: "Ingresa el nombre del grupo" }]}
      >
        <Input placeholder="Escribe el nombre del grupo" />
      </Form.Item>

      <Form.Item
        name="members"
        label="Seleccionar Miembros"
        rules={[{ required: true, message: "Selecciona al menos un miembro" }]}
      >
        <Select
          mode="multiple"
          placeholder="Selecciona los miembros"
          value={selectedUsers}
          onChange={handleSelectChange}
          options={users.map(user => ({
            value: user.id, // Usar ID en lugar de username
            label: user.username, // Mostrar el nombre de usuario
          }))}
        />


      </Form.Item>

      <div>
        <h4>Claves de miembros seleccionados:</h4>
        <ul>
          {selectedUsers.map((username, index) => (
            <li key={index}>{username}</li>
          ))}
        </ul>
      </div>

      <Button
        type="primary"
        onClick={() => {
          form
            .validateFields()
            .then((values) => {
              handleGroupOk(values); // Pasar todos los valores del formulario
            })
            .catch((errorInfo) => {
              console.log("Error al validar:", errorInfo);
            });
        }}
      >
        Crear Grupo
      </Button>

      <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
        Cancelar
      </Button>
    </Form>
  );
};

export default GroupForm;
