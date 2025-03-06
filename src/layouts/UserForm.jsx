// UpdateUserForm.js
import { React, useEffect } from "react";
import { Form, Input, Button, Select, Modal } from "antd";

const { Option } = Select;

const UpdateUserForm = ({ visible, onCancel, user, onUpdate, group }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        role: user.role,
        email: user.email,
      });
    }
  }, [user, form]); // Actualiza cuando `user` cambie

  return (
    <Modal
      visible={visible}
      title="Actualizar Usuario"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
        >
          Actualizar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={onUpdate} >
        <Form.Item
          name="username"
          label="Usuario"
          rules={[{ required: true, message: "Por favor ingrese el nombre de usuario" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Rol"
          rules={[{ required: true, message: "Por favor seleccione el rol" }]}
        >
          <Select>
            <Option value={3}>Master</Option>
            <Option value={2}>Admin</Option>
            <Option value={1}>Worker</Option>
            {/* Agrega más roles según tu aplicación */}
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[{ required: true, message: "Por favor ingrese el correo electrónico" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserForm;
